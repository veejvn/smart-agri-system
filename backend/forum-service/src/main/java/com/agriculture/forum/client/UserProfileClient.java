package com.agriculture.forum.client;

import com.agriculture.forum.dto.AuthorProfileDTO;
import com.agriculture.forum.dto.UserProfileBatchRequestDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(
        name = "user-service",
        path = "/api/users/profile",
        dismiss404 = true,
        fallback = UserProfileClientFallback.class
)
public interface UserProfileClient {

    @PostMapping("/batch")
    List<AuthorProfileDTO> getProfilesByUserIds(@RequestBody UserProfileBatchRequestDTO request);
}
