package com.agriculture.crop.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FarmPlotDTO {
    private Long locationId;
    private String plotName;
    private Double areaHa;
    private String soilType;
}
