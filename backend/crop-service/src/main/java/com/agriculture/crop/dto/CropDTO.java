package com.agriculture.crop.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CropDTO {
    private String cropName;
    private String variety;
    private LocalDate plantingDate;
    private LocalDate expectedHarvestDate;
    private String status;
}
