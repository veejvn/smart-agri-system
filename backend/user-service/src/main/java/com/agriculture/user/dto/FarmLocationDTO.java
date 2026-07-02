package com.agriculture.user.dto;

import lombok.Data;

@Data
public class FarmLocationDTO {
    private String farmName;
    private String address;
    private Double latitude;
    private Double longitude;
    private Double areaHa;
}
