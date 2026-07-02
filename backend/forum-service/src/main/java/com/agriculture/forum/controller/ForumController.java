package com.agriculture.forum.controller;

import com.agriculture.forum.document.Comment;
import com.agriculture.forum.document.Post;
import com.agriculture.forum.dto.CommentDTO;
import com.agriculture.forum.dto.PostDTO;
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
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(forumService.getAllPosts());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
                                           @RequestBody PostDTO dto) {
        return ResponseEntity.ok(forumService.createPost(userId, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable String id) {
        return ResponseEntity.ok(forumService.getPostById(id));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable String id) {
        return ResponseEntity.ok(forumService.getComments(id));
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable String id,
                                              @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
                                              @RequestBody CommentDTO dto) {
        return ResponseEntity.ok(forumService.addComment(id, userId, dto));
    }
}
