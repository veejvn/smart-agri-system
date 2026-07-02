package com.agriculture.crop.service;

import com.agriculture.crop.dto.CropDTO;
import com.agriculture.crop.dto.CropLogDTO;
import com.agriculture.crop.dto.FarmPlotDTO;
import com.agriculture.crop.entity.Crop;
import com.agriculture.crop.entity.CropLog;
import com.agriculture.crop.entity.FarmPlot;
import com.agriculture.crop.repository.CropLogRepository;
import com.agriculture.crop.repository.CropRepository;
import com.agriculture.crop.repository.FarmPlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CropService {

    private final FarmPlotRepository farmPlotRepository;
    private final CropRepository cropRepository;
    private final CropLogRepository cropLogRepository;

    public List<FarmPlot> getPlotsByUser(Long userId) {
        return farmPlotRepository.findByUserId(userId);
    }

    public FarmPlot createPlot(Long userId, FarmPlotDTO dto) {
        FarmPlot plot = FarmPlot.builder()
                .userId(userId)
                .locationId(dto.getLocationId())
                .plotName(dto.getPlotName())
                .areaHa(dto.getAreaHa())
                .soilType(dto.getSoilType())
                .build();
        return farmPlotRepository.save(plot);
    }

    public List<Crop> getCropsByPlot(Long plotId) {
        return cropRepository.findByPlotId(plotId);
    }

    public Crop addCrop(Long plotId, CropDTO dto) {
        FarmPlot plot = farmPlotRepository.findById(plotId)
                .orElseThrow(() -> new RuntimeException("Plot not found"));
                
        Crop crop = Crop.builder()
                .plot(plot)
                .cropName(dto.getCropName())
                .variety(dto.getVariety())
                .plantingDate(dto.getPlantingDate())
                .expectedHarvestDate(dto.getExpectedHarvestDate())
                .status(dto.getStatus() != null ? dto.getStatus() : "PLANTED")
                .build();
                
        return cropRepository.save(crop);
    }

    public List<CropLog> getCropLogs(Long cropId) {
        return cropLogRepository.findByCropId(cropId);
    }

    public CropLog addCropLog(Long cropId, CropLogDTO dto) {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));
                
        CropLog log = CropLog.builder()
                .crop(crop)
                .activityType(dto.getActivityType())
                .description(dto.getDescription())
                .logDate(dto.getLogDate())
                .build();
                
        return cropLogRepository.save(log);
    }
}
