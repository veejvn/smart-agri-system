package com.agriculture.crop.controller;

import com.agriculture.crop.service.CropService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FarmPlotController.class)
class FarmPlotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CropService cropService;

    @Test
    void getPlotsRequiresUserIdHeader() throws Exception {
        mockMvc.perform(get("/api/crops/plots"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getPlotsWithUserIdHeaderReturnsOk() throws Exception {
        when(cropService.getPlotsByUser(1L)).thenReturn(List.of());

        mockMvc.perform(get("/api/crops/plots").header("X-User-Id", "1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}
