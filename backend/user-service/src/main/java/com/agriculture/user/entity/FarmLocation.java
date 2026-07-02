package com.agriculture.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "farm_locations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId; // References Auth Service User ID

    @Column(nullable = false)
    private String farmName;

    private String address;
    private Double latitude;
    private Double longitude;
    private Double areaHa; // Area in hectares
}
