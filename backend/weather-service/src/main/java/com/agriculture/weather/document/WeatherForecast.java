package com.agriculture.weather.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "weather_forecast")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherForecast {

    @Id
    private String id;

    private String location;
    private LocalDate forecastDate;
    
    private Double minTemp;
    private Double maxTemp;
    private String condition;

    private LocalDateTime recordedAt;
}
