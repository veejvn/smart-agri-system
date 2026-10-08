package com.agriculture.forum.dto;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;

@Value
@Builder
public class CommentResponseDTO {
    String id;
    String postId;
    Long authorId;
    AuthorProfileDTO author;
    String content;
    LocalDateTime createdAt;
}
