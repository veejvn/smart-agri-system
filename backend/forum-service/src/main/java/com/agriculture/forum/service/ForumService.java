package com.agriculture.forum.service;

import com.agriculture.forum.document.Comment;
import com.agriculture.forum.document.Post;
import com.agriculture.forum.client.UserProfileClient;
import com.agriculture.forum.dto.AuthorProfileDTO;
import com.agriculture.forum.dto.CommentDTO;
import com.agriculture.forum.dto.CommentResponseDTO;
import com.agriculture.forum.dto.PostDTO;
import com.agriculture.forum.dto.PostResponseDTO;
import com.agriculture.forum.dto.UserProfileBatchRequestDTO;
import com.agriculture.forum.repository.CommentRepository;
import com.agriculture.forum.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserProfileClient userProfileClient;
    private final CacheManager cacheManager;

    public List<PostResponseDTO> getAllPosts() {
        List<Post> posts = postRepository.findAllByOrderByCreatedAtDesc();
        Map<Long, AuthorProfileDTO> authors = getAuthorProfiles(
                posts.stream().map(Post::getAuthorId).toList());
        return posts.stream()
                .map(post -> toPostResponse(post, authors))
                .toList();
    }

    public PostResponseDTO createPost(Long authorId, PostDTO dto) {
        Post post = Post.builder()
                .authorId(authorId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .tags(dto.getTags())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Post savedPost = postRepository.save(post);
        return toPostResponse(savedPost, getAuthorProfiles(Collections.singletonList(savedPost.getAuthorId())));
    }

    public PostResponseDTO getPostById(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return toPostResponse(post, getAuthorProfiles(Collections.singletonList(post.getAuthorId())));
    }

    public List<CommentResponseDTO> getComments(String postId) {
        List<Comment> comments = commentRepository.findByPostIdOrderByCreatedAtAsc(postId);
        Map<Long, AuthorProfileDTO> authors = getAuthorProfiles(
                comments.stream().map(Comment::getAuthorId).toList());
        return comments.stream()
                .map(comment -> toCommentResponse(comment, authors))
                .toList();
    }

    public CommentResponseDTO addComment(String postId, Long authorId, CommentDTO dto) {
        Comment comment = Comment.builder()
                .postId(postId)
                .authorId(authorId)
                .content(dto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
        Comment savedComment = commentRepository.save(comment);
        return toCommentResponse(savedComment,
                getAuthorProfiles(Collections.singletonList(savedComment.getAuthorId())));
    }

    private PostResponseDTO toPostResponse(Post post, Map<Long, AuthorProfileDTO> authors) {
        return PostResponseDTO.builder()
                .id(post.getId())
                .authorId(post.getAuthorId())
                .author(authors.get(post.getAuthorId()))
                .title(post.getTitle())
                .content(post.getContent())
                .tags(post.getTags())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    private CommentResponseDTO toCommentResponse(Comment comment, Map<Long, AuthorProfileDTO> authors) {
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .postId(comment.getPostId())
                .authorId(comment.getAuthorId())
                .author(authors.get(comment.getAuthorId()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    private Map<Long, AuthorProfileDTO> getAuthorProfiles(Collection<Long> authorIds) {
        Set<Long> distinctAuthorIds = authorIds.stream()
                .filter(userId -> userId != null)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        Map<Long, AuthorProfileDTO> authors = new HashMap<>();
        List<Long> uncachedAuthorIds = new ArrayList<>();
        Cache authorProfiles = cacheManager.getCache("authorProfiles");

        for (Long authorId : distinctAuthorIds) {
            Cache.ValueWrapper cached = authorProfiles.get(authorId);
            if (cached == null) {
                uncachedAuthorIds.add(authorId);
                continue;
            }

            Object value = cached.get();
            if (value instanceof Optional<?> optionalProfile) {
                optionalProfile.filter(AuthorProfileDTO.class::isInstance)
                        .map(AuthorProfileDTO.class::cast)
                        .ifPresent(profile -> authors.put(authorId, profile));
            }
        }

        if (uncachedAuthorIds.isEmpty()) {
            return authors;
        }

        try {
            List<AuthorProfileDTO> profiles = userProfileClient.getProfilesByUserIds(
                    new UserProfileBatchRequestDTO(uncachedAuthorIds));
            if (profiles != null) {
                for (AuthorProfileDTO profile : profiles) {
                    if (profile != null && profile.getUserId() != null
                            && distinctAuthorIds.contains(profile.getUserId())) {
                        authors.put(profile.getUserId(), profile);
                        authorProfiles.put(profile.getUserId(), Optional.of(profile));
                    }
                }
            }

            for (Long authorId : uncachedAuthorIds) {
                if (!authors.containsKey(authorId)) {
                    authorProfiles.put(authorId, Optional.empty());
                }
            }
        } catch (RuntimeException exception) {
            // Profile outages should not prevent forum content from being returned.
        }

        return authors;
    }
}
