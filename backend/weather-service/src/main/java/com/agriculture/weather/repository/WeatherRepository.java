package com.agriculture.weather.repository;

import com.agriculture.weather.document.WeatherData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeatherRepository extends MongoRepository<WeatherData, String> {
    List<WeatherData> findByLocationOrderByTimestampDesc(String location);
}
