package com.agriculture.forum.controller;

import com.agriculture.forum.dto.CommentDTO;
import com.agriculture.forum.dto.CommentResponseDTO;
import com.agriculture.forum.dto.PostDTO;
import com.agriculture.forum.dto.PostResponseDTO;
import com.agriculture.forum.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forum/posts")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
        return ResponseEntity.ok(forumService.getAllPosts());
    }

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@RequestHeader("X-User-Id") Long userId,
                                           @RequestBody PostDTO dto) {
        return ResponseEntity.ok(forumService.createPost(userId, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPost(@PathVariable String id) {
        return ResponseEntity.ok(forumService.getPostById(id));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentResponseDTO>> getComments(@PathVariable String id) {
        return ResponseEntity.ok(forumService.getComments(id));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<CommentResponseDTO> addComment(@PathVariable String id,
                                              @RequestHeader("X-User-Id") Long userId,
                                              @RequestBody CommentDTO dto) {
        return ResponseEntity.ok(forumService.addComment(id, userId, dto));
    }
}
