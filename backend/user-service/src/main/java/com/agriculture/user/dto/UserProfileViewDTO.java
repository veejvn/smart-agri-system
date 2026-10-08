package com.agriculture.user.dto;

import com.agriculture.user.entity.UserProfile;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserProfileViewDTO {
    Long userId;
    String fullName;
    String avatarUrl;
    String bio;

    public static UserProfileViewDTO from(UserProfile profile) {
        return UserProfileViewDTO.builder()
                .userId(profile.getUserId())
                .fullName(profile.getFullName())
                .avatarUrl(profile.getAvatarUrl())
                .bio(profile.getBio())
                .build();
    }
}
