package com.agriculture.user.service;

import com.agriculture.user.dto.FarmLocationDTO;
import com.agriculture.user.entity.FarmLocation;
import com.agriculture.user.repository.FarmLocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FarmLocationService {

    private final FarmLocationRepository farmLocationRepository;

    public List<FarmLocation> getFarmsByUser(Long userId) {
        return farmLocationRepository.findByUserId(userId);
    }

    public FarmLocation addFarm(Long userId, FarmLocationDTO dto) {
        FarmLocation farm = FarmLocation.builder()
                .userId(userId)
                .farmName(dto.getFarmName())
                .address(dto.getAddress())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .areaHa(dto.getAreaHa())
                .build();
                
        return farmLocationRepository.save(farm);
    }
}
