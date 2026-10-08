package com.agriculture.forum.client;

import com.agriculture.forum.dto.AuthorProfileDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", path = "/api/users/profile", dismiss404 = true)
public interface UserProfileClient {

    @GetMapping("/{userId}")
    AuthorProfileDTO getProfileByUserId(@PathVariable("userId") Long userId);
}
