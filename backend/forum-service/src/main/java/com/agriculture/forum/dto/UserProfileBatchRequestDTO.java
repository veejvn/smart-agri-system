package com.agriculture.forum.dto;

import java.util.List;

public record UserProfileBatchRequestDTO(List<Long> userIds) {
}
