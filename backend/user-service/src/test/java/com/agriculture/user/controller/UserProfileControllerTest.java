package com.agriculture.user.controller;

import com.agriculture.user.service.UserProfileService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserProfileController.class)
class UserProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserProfileService userProfileService;

    @Test
    void getProfileRequiresUserIdHeader() throws Exception {
        mockMvc.perform(get("/api/users/profile"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getProfileWithUserIdHeaderReturnsNotFoundWhenMissing() throws Exception {
        when(userProfileService.getProfile(5L)).thenReturn(null);

        mockMvc.perform(get("/api/users/profile").header("X-User-Id", "5"))
                .andExpect(status().isNotFound());
    }

    @Test
    void batchEndpointReturnsProfiles() throws Exception {
        when(userProfileService.getProfilesByUserIds(List.of(1L, 2L))).thenReturn(List.of());

        mockMvc.perform(post("/api/users/profile/batch")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userIds\":[1,2]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void batchEndpointDoesNotRequireUserIdHeader() throws Exception {
        when(userProfileService.getProfilesByUserIds(List.of(7L))).thenReturn(List.of());

        mockMvc.perform(post("/api/users/profile/batch")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userIds\":[7]}"))
                .andExpect(status().isOk());
    }
}
