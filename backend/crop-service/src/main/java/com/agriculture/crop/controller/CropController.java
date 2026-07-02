package com.agriculture.crop.controller;

import com.agriculture.crop.dto.CropDTO;
import com.agriculture.crop.dto.CropLogDTO;
import com.agriculture.crop.entity.Crop;
import com.agriculture.crop.entity.CropLog;
import com.agriculture.crop.service.CropService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@RequiredArgsConstructor
public class CropController {

    private final CropService cropService;

    @GetMapping("/plots/{plotId}/crops")
    public ResponseEntity<List<Crop>> getCropsByPlot(@PathVariable Long plotId) {
        return ResponseEntity.ok(cropService.getCropsByPlot(plotId));
    }

    @PostMapping("/plots/{plotId}/crops")
    public ResponseEntity<Crop> addCrop(@PathVariable Long plotId, @RequestBody CropDTO dto) {
        return ResponseEntity.ok(cropService.addCrop(plotId, dto));
    }

    @GetMapping("/{cropId}/logs")
    public ResponseEntity<List<CropLog>> getCropLogs(@PathVariable Long cropId) {
        return ResponseEntity.ok(cropService.getCropLogs(cropId));
    }

    @PostMapping("/{cropId}/logs")
    public ResponseEntity<CropLog> addCropLog(@PathVariable Long cropId, @RequestBody CropLogDTO dto) {
        // Here we could also trigger a Kafka event for CROP_ACTIVITY to NotificationService
        return ResponseEntity.ok(cropService.addCropLog(cropId, dto));
    }
}
