package com.agriculture.crop.repository;

import com.agriculture.crop.entity.CropLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropLogRepository extends JpaRepository<CropLog, Long> {
    List<CropLog> findByCropId(Long cropId);
}
