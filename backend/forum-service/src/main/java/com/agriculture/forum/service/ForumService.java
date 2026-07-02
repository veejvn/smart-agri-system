package com.agriculture.forum.service;

import com.agriculture.forum.document.Comment;
import com.agriculture.forum.document.Post;
import com.agriculture.forum.dto.CommentDTO;
import com.agriculture.forum.dto.PostDTO;
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

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post createPost(Long authorId, PostDTO dto) {
        Post post = Post.builder()
                .authorId(authorId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .tags(dto.getTags())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return postRepository.save(post);
    }

    public Post getPostById(String id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public List<Comment> getComments(String postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId);
    }

    public Comment addComment(String postId, Long authorId, CommentDTO dto) {
        Comment comment = Comment.builder()
                .postId(postId)
                .authorId(authorId)
                .content(dto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
        return commentRepository.save(comment);
    }
}
