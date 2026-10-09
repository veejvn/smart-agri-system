package com.agriculture.user.service;

import com.agriculture.user.dto.UserProfileDTO;
import com.agriculture.user.dto.UserProfileViewDTO;
import com.agriculture.user.entity.UserProfile;
import com.agriculture.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfile getProfile(Long userId) {
        return userProfileRepository.findByUserId(userId).orElse(null);
    }

    public List<UserProfileViewDTO> getProfilesByUserIds(List<Long> userIds) {
        return userProfileRepository.findAllByUserIdIn(userIds).stream()
                .map(UserProfileViewDTO::from)
                .toList();
    }

    public UserProfile updateProfile(Long userId, UserProfileDTO dto) {
        Optional<UserProfile> existingProfileOptional = userProfileRepository.findByUserId(userId);
        
        UserProfile profile;
        if (existingProfileOptional.isPresent()) {
            profile = existingProfileOptional.get();
        } else {
            profile = new UserProfile();
            profile.setUserId(userId);
        }
        
        profile.setFullName(dto.getFullName());
        profile.setPhone(dto.getPhone());
        profile.setAvatarUrl(dto.getAvatarUrl());
        profile.setBio(dto.getBio());
        
        return userProfileRepository.save(profile);
    }
}
