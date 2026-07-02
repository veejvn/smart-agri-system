package com.agriculture.forum.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "votes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vote {

    @Id
    private String id;
    
    private String targetId; // post_id or comment_id
    private String targetType; // POST or COMMENT
    
    private Long userId;
    
    private String voteType; // UPVOTE or DOWNVOTE
    
    private LocalDateTime createdAt;
}
