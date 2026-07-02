package com.agriculture.weather.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "weather_data")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherData {

    @Id
    private String id;

    private String location;
    private Double temperature;
    private Double humidity;
    private Double rainfall;
    private Double windSpeed;
    private String condition;

    private LocalDateTime timestamp;
}
