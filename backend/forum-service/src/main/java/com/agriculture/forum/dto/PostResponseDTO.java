package com.agriculture.forum.dto;

import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.List;

@Value
@Builder
public class PostResponseDTO {
    String id;
    Long authorId;
    AuthorProfileDTO author;
    String title;
    String content;
    List<String> tags;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
