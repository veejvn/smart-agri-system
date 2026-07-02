package com.agriculture.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherEvent {
    private String eventType;
    private String location;
    private String alertType;
    private String severity;
    private String message;
    private String timestamp;
}
