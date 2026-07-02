package com.agriculture.weather.service;

import com.agriculture.weather.document.WeatherData;
import com.agriculture.weather.document.WeatherForecast;
import com.agriculture.weather.dto.WeatherEvent;
import com.agriculture.weather.kafka.WeatherAlertProducer;
import com.agriculture.weather.repository.WeatherForecastRepository;
import com.agriculture.weather.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WeatherService {

    private final WeatherRepository weatherRepository;
    private final WeatherForecastRepository forecastRepository;
    private final WeatherAlertProducer alertProducer;

    public WeatherData getCurrentWeather(String location) {
        // In a real scenario, this would call OpenWeatherMap API
        // For now, we mock it and save to DB
        
        WeatherData data = WeatherData.builder()
                .location(location)
                .temperature(Math.random() * 15 + 20) // 20-35 C
                .humidity(Math.random() * 50 + 40) // 40-90 %
                .rainfall(Math.random() * 20) // 0-20 mm
                .windSpeed(Math.random() * 15) // 0-15 km/h
                .condition(Math.random() > 0.5 ? "Clear" : "Rain")
                .timestamp(LocalDateTime.now())
                .build();
                
        // Check for alerts
        if (data.getRainfall() > 15 || data.getTemperature() > 33) {
            sendWeatherAlert(data);
        }

        return weatherRepository.save(data);
    }

    public List<WeatherForecast> getForecast(String location) {
        List<WeatherForecast> forecasts = forecastRepository.findByLocationOrderByForecastDateAsc(location);
        
        if (forecasts.isEmpty()) {
            // Mock generating 5 days forecast
            for (int i = 1; i <= 5; i++) {
                WeatherForecast forecast = WeatherForecast.builder()
                        .location(location)
                        .forecastDate(LocalDate.now().plusDays(i))
                        .minTemp(22.0 + Math.random() * 5)
                        .maxTemp(28.0 + Math.random() * 7)
                        .condition("Cloudy")
                        .recordedAt(LocalDateTime.now())
                        .build();
                forecasts.add(forecastRepository.save(forecast));
            }
        }
        
        return forecasts;
    }

    public List<WeatherData> getHistory(String location) {
        return weatherRepository.findByLocationOrderByTimestampDesc(location);
    }
    
    private void sendWeatherAlert(WeatherData data) {
        String alertType = data.getRainfall() > 15 ? "HEAVY_RAIN" : "EXTREME_HEAT";
        String message = data.getRainfall() > 15 
                ? "Heavy rain detected: " + String.format("%.1f", data.getRainfall()) + " mm" 
                : "Extreme heat detected: " + String.format("%.1f", data.getTemperature()) + " C";
                
        WeatherEvent event = WeatherEvent.builder()
                .eventType("WEATHER_ALERT")
                .location(data.getLocation())
                .alertType(alertType)
                .severity("HIGH")
                .message(message)
                .timestamp(LocalDateTime.now().toString())
                .build();
                
        alertProducer.sendAlert(event);
    }
}
