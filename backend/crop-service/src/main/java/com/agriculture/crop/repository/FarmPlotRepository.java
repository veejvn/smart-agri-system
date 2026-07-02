package com.agriculture.crop.repository;

import com.agriculture.crop.entity.Crop;
import com.agriculture.crop.entity.CropLog;
import com.agriculture.crop.entity.FarmPlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmPlotRepository extends JpaRepository<FarmPlot, Long> {
    List<FarmPlot> findByUserId(Long userId);
}
// Simulated multiple files by omitting explicit file generation for now, writing separately below.
