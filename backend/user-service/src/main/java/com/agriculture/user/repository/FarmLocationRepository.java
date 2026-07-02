package com.agriculture.user.repository;

import com.agriculture.user.entity.FarmLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FarmLocationRepository extends JpaRepository<FarmLocation, Long> {
    List<FarmLocation> findByUserId(Long userId);
}
