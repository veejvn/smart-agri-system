package com.agriculture.user.dto;

import lombok.Data;

@Data
public class UserProfileDTO {
    private String fullName;
    private String phone;
    private String avatarUrl;
    private String bio;
}
