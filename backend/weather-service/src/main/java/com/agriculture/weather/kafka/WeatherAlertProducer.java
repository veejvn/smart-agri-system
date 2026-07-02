package com.agriculture.weather.kafka;

import com.agriculture.weather.dto.WeatherEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class WeatherAlertProducer {

    private static final Logger LOGGER = LoggerFactory.getLogger(WeatherAlertProducer.class);

    private final KafkaTemplate<String, WeatherEvent> kafkaTemplate;

    public WeatherAlertProducer(KafkaTemplate<String, WeatherEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendAlert(WeatherEvent event) {
        LOGGER.info(String.format("Weather Alert event => %s", event.toString()));

        Message<WeatherEvent> message = MessageBuilder
                .withPayload(event)
                .setHeader(KafkaHeaders.TOPIC, "weather-alert")
                .build();

        kafkaTemplate.send(message);
    }
}
