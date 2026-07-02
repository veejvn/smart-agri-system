package com.agriculture.weather.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherEvent {
    private String eventType; // e.g. WEATHER_ALERT
    private String location;
    private String alertType; // e.g. HEAVY_RAIN, EXTREME_HEAT
    private String severity; // HIGH, MEDIUM, LOW
    private String message;
    private String timestamp;
}
