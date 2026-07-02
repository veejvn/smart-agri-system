package com.agriculture.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId; // References Auth Service User ID

    private String fullName;
    private String phone;
    private String avatarUrl;
    
    @Column(columnDefinition = "TEXT")
    private String bio;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
