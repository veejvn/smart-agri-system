package com.agriculture.notification.controller;

import com.agriculture.notification.service.NotificationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NotificationController.class)
class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NotificationService notificationService;

    @Test
    void getNotificationsRequiresUserIdHeader() throws Exception {
        mockMvc.perform(get("/api/notifications"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getNotificationsWithUserIdHeaderReturnsOk() throws Exception {
        when(notificationService.getUserNotifications(1L)).thenReturn(List.of());

        mockMvc.perform(get("/api/notifications").header("X-User-Id", "1"))
                .andExpect(status().isOk());
    }
}
