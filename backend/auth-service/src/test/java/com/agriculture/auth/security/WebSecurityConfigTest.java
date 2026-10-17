package com.agriculture.auth.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WebSecurityConfigTest {

    @Test
    void authenticationProviderAuthenticatesWithUserDetailsAndPasswordEncoder() {
        String encodedPassword = new BCryptPasswordEncoder().encode("correct-password");
        UserDetailsServiceImpl userDetailsService = mock(UserDetailsServiceImpl.class);
        when(userDetailsService.loadUserByUsername("farmer")).thenReturn(User.withUsername("farmer")
                .password(encodedPassword)
                .roles("FARMER")
                .build());

        WebSecurityConfig config = new WebSecurityConfig();
        ReflectionTestUtils.setField(config, "userDetailsService", userDetailsService);

        Authentication authentication = config.authenticationProvider().authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated("farmer", "correct-password"));

        assertThat(authentication.isAuthenticated()).isTrue();
        assertThat(authentication.getName()).isEqualTo("farmer");
    }
}
