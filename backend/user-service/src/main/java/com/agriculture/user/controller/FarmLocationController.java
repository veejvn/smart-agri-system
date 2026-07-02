package com.agriculture.user.controller;

import com.agriculture.user.dto.FarmLocationDTO;
import com.agriculture.user.entity.FarmLocation;
import com.agriculture.user.service.FarmLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/farms")
@RequiredArgsConstructor
public class FarmLocationController {

    private final FarmLocationService farmLocationService;

    @GetMapping
    public ResponseEntity<List<FarmLocation>> getFarms(@RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId) {
        return ResponseEntity.ok(farmLocationService.getFarmsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<FarmLocation> addFarm(@RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
                                                @RequestBody FarmLocationDTO dto) {
        return ResponseEntity.ok(farmLocationService.addFarm(userId, dto));
    }
}
