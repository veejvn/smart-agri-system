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
@Table(name = "crops")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plot_id", nullable = false)
    private FarmPlot plot;

    @Column(nullable = false)
    private String cropName;

    private String variety;
    
    private LocalDate plantingDate;
    private LocalDate expectedHarvestDate;
    
    // Status e.g., PLANTED, GROWING, HARVESTED, FAILED
    private String status;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
