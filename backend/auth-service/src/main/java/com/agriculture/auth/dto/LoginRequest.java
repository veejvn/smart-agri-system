package com.agriculture.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}

// --- Next File Content logic simulated by placing classes in same package (for brevity, will separate later if needed, but Java allows multiple non-public, or I'll just write separate files)
