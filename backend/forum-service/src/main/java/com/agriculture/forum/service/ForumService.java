package com.agriculture.forum.service;

import com.agriculture.forum.document.Comment;
import com.agriculture.forum.document.Post;
import com.agriculture.forum.client.UserProfileClient;
import com.agriculture.forum.dto.AuthorProfileDTO;
import com.agriculture.forum.dto.CommentDTO;
import com.agriculture.forum.dto.CommentResponseDTO;
import com.agriculture.forum.dto.PostDTO;
import com.agriculture.forum.dto.PostResponseDTO;
import com.agriculture.forum.repository.CommentRepository;
import com.agriculture.forum.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserProfileClient userProfileClient;

    public List<PostResponseDTO> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toPostResponse)
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
        return toPostResponse(postRepository.save(post));
    }

    public PostResponseDTO getPostById(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return toPostResponse(post);
    }

    public List<CommentResponseDTO> getComments(String postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId).stream()
                .map(this::toCommentResponse)
                .toList();
    }

    public CommentResponseDTO addComment(String postId, Long authorId, CommentDTO dto) {
        Comment comment = Comment.builder()
                .postId(postId)
                .authorId(authorId)
                .content(dto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
        return toCommentResponse(commentRepository.save(comment));
    }

    private PostResponseDTO toPostResponse(Post post) {
        return PostResponseDTO.builder()
                .id(post.getId())
                .authorId(post.getAuthorId())
                .author(getAuthorProfile(post.getAuthorId()))
                .title(post.getTitle())
                .content(post.getContent())
                .tags(post.getTags())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    private CommentResponseDTO toCommentResponse(Comment comment) {
        return CommentResponseDTO.builder()
                .id(comment.getId())
                .postId(comment.getPostId())
                .authorId(comment.getAuthorId())
                .author(getAuthorProfile(comment.getAuthorId()))
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .build();
    }

    private AuthorProfileDTO getAuthorProfile(Long userId) {
        return userId == null ? null : userProfileClient.getProfileByUserId(userId);
    }
}
