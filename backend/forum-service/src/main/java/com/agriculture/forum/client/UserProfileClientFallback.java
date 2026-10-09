package com.agriculture.forum.client;

import com.agriculture.forum.dto.AuthorProfileDTO;
import com.agriculture.forum.dto.UserProfileBatchRequestDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserProfileClientFallback implements UserProfileClient {

    @Override
    public List<AuthorProfileDTO> getProfilesByUserIds(UserProfileBatchRequestDTO request) {
        throw new UserProfileUnavailableException("User profile lookup is unavailable");
    }
}
