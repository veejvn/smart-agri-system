package com.agriculture.weather.controller;

import com.agriculture.weather.document.WeatherData;
import com.agriculture.weather.document.WeatherForecast;
import com.agriculture.weather.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
@RequiredArgsConstructor
public class WeatherController {

    private final WeatherService weatherService;

    @GetMapping("/current")
    public ResponseEntity<WeatherData> getCurrentWeather(@RequestParam String location) {
        return ResponseEntity.ok(weatherService.getCurrentWeather(location));
    }

    @GetMapping("/forecast")
    public ResponseEntity<List<WeatherForecast>> getForecast(@RequestParam String location) {
        return ResponseEntity.ok(weatherService.getForecast(location));
    }

    @GetMapping("/history")
    public ResponseEntity<List<WeatherData>> getHistory(@RequestParam String location) {
        return ResponseEntity.ok(weatherService.getHistory(location));
    }
}
