package com.agriculture.forum.dto;

import lombok.Data;

@Data
public class AuthorProfileDTO {
    private Long userId;
    private String fullName;
    private String avatarUrl;
    private String bio;
}
