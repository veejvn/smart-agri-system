package com.agriculture.notification.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Optional user ID. If null, might be a global notification
    private Long userId;

    private String type; // e.g. WEATHER_ALERT, FORUM_REPLY, CROP_REMINDER
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String message;

    private boolean isRead;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
