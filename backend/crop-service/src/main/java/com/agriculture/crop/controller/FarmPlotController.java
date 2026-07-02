package com.agriculture.crop.controller;

import com.agriculture.crop.dto.FarmPlotDTO;
import com.agriculture.crop.entity.FarmPlot;
import com.agriculture.crop.service.CropService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops/plots")
@RequiredArgsConstructor
public class FarmPlotController {

    private final CropService cropService;

    @GetMapping
    public ResponseEntity<List<FarmPlot>> getPlots(@RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId) {
        return ResponseEntity.ok(cropService.getPlotsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<FarmPlot> createPlot(@RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
                                               @RequestBody FarmPlotDTO dto) {
        return ResponseEntity.ok(cropService.createPlot(userId, dto));
    }
}
