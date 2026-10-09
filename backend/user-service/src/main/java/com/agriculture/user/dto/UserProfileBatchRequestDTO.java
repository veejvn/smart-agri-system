package com.agriculture.user.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserProfileBatchRequestDTO {
    private List<Long> userIds;
}
