package com.agriculture.notification.kafka;

import com.agriculture.notification.dto.WeatherEvent;
import com.agriculture.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WeatherAlertConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(WeatherAlertConsumer.class);
    
    private final NotificationService notificationService;

    @KafkaListener(topics = "weather-alert", groupId = "notification-group")
    public void consume(WeatherEvent event) {
        LOGGER.info(String.format("Weather event received in notification service => %s", event.toString()));
        
        // In a real application, we might find users in this specific location via User Service (using Feign client)
        // and notify only them.
        // For simplicity, we create a global notification (userId = null)
        
        String title = "Weather Alert: " + event.getAlertType();
        
        notificationService.createNotification(
                null, // null indicates global broadcast
                event.getEventType(),
                title,
                event.getMessage()
        );
    }
}
