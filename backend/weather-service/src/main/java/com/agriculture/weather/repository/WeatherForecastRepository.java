package com.agriculture.weather.repository;

import com.agriculture.weather.document.WeatherForecast;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeatherForecastRepository extends MongoRepository<WeatherForecast, String> {
    List<WeatherForecast> findByLocationOrderByForecastDateAsc(String location);
}
