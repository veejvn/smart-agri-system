package com.agriculture.crop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "crop_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    // e.g., FERTILIZING, WATERING, PESTICIDE
    @Column(nullable = false)
    private String activityType;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate logDate;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
