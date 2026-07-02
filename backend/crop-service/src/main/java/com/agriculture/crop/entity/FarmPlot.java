package com.agriculture.crop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "farm_plots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmPlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId; // References Auth Service User ID

    @Column(nullable = false)
    private Long locationId; // References User Service FarmLocation ID

    @Column(nullable = false)
    private String plotName;

    private Double areaHa;
    private String soilType;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
