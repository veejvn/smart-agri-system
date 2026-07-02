package com.agriculture.forum.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    
    @Id
    private String id;
    
    private Long authorId; // References auth service user ID
    private String title;
    private String content;
    private List<String> tags;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
