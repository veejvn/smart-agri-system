package com.agriculture.crop.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CropLogDTO {
    private String activityType;
    private String description;
    private LocalDate logDate;
}
