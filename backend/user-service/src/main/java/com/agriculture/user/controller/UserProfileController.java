package com.agriculture.user.controller;

import com.agriculture.user.dto.UserProfileDTO;
import com.agriculture.user.dto.UserProfileViewDTO;
import com.agriculture.user.entity.UserProfile;
import com.agriculture.user.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping
    public ResponseEntity<UserProfile> getProfile(@RequestHeader("X-User-Id") Long userId) {
        // In a real-world scenario with an API Gateway handling auth properly, 
        // the Gateway injects the resolved User ID into this custom header.
        
        UserProfile profile = userProfileService.getProfile(userId);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileViewDTO> getProfileByUserId(@PathVariable Long userId) {
        UserProfile profile = userProfileService.getProfile(userId);
        if (profile != null) {
            return ResponseEntity.ok(UserProfileViewDTO.from(profile));
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping
    public ResponseEntity<UserProfile> updateProfile(@RequestHeader("X-User-Id") Long userId,
                                                     @RequestBody UserProfileDTO dto) {
        return ResponseEntity.ok(userProfileService.updateProfile(userId, dto));
    }
}
