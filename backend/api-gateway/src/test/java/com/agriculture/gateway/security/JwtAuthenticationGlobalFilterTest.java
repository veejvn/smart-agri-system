package com.agriculture.gateway.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class JwtAuthenticationGlobalFilterTest {

    private static final String SECRET =
            "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

    private final JwtAuthenticationGlobalFilter filter = new JwtAuthenticationGlobalFilter(SECRET);
    private GatewayFilterChain chain;

    @BeforeEach
    void setUp() {
        chain = mock(GatewayFilterChain.class);
        when(chain.filter(any())).thenReturn(Mono.empty());
    }

    private String token(Long userId, String subject, List<String> roles) {
        var builder = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60_000));
        if (userId != null) {
            builder.claim("userId", userId);
        }
        if (roles != null) {
            builder.claim("roles", roles);
        }
        return builder
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET)), SignatureAlgorithm.HS256)
                .compact();
    }

    @Test
    void rejectsProtectedPathWithoutToken() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/users/profile").build());

        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        assertThat(exchange.getResponse().getHeaders().getFirst(HttpHeaders.WWW_AUTHENTICATE))
                .isEqualTo("Bearer error=\"invalid_token\"");
        verify(chain, never()).filter(any());
    }

    @Test
    void allowsPublicAuthPathWithoutToken() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.post("/api/auth/login").build());

        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isNotEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain).filter(any());
    }

    @Test
    void logoutIsNoLongerPublic() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.post("/api/auth/logout").build());

        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(any());
    }

    @Test
    void allowsPreflightOptionsWithoutToken() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.method(HttpMethod.OPTIONS, "/api/users/profile").build());

        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isNotEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain).filter(any());
    }

    @Test
    void injectsIdentityHeadersFromValidToken() {
        String jwt = token(42L, "alice", List.of("ROLE_USER", "ROLE_FARMER"));
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/users/profile")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                        .build());

        filter.filter(exchange, chain).block();

        ArgumentCaptor<ServerWebExchange> captor = ArgumentCaptor.forClass(ServerWebExchange.class);
        verify(chain).filter(captor.capture());
        HttpHeaders headers = captor.getValue().getRequest().getHeaders();
        assertThat(headers.getFirst("X-User-Id")).isEqualTo("42");
        assertThat(headers.getFirst("X-Username")).isEqualTo("alice");
        assertThat(headers.getFirst("X-Roles")).isEqualTo("ROLE_USER,ROLE_FARMER");
    }

    @Test
    void stripsClientSuppliedIdentityHeaders() {
        String jwt = token(42L, "alice", List.of("ROLE_USER"));
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/users/profile")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                        .header("X-User-Id", "9999")
                        .header("X-Username", "victim")
                        .header("X-Roles", "ROLE_ADMIN")
                        .build());

        filter.filter(exchange, chain).block();

        ArgumentCaptor<ServerWebExchange> captor = ArgumentCaptor.forClass(ServerWebExchange.class);
        verify(chain).filter(captor.capture());
        HttpHeaders headers = captor.getValue().getRequest().getHeaders();
        assertThat(headers.getFirst("X-User-Id")).isEqualTo("42");
        assertThat(headers.getFirst("X-Username")).isEqualTo("alice");
        assertThat(headers.getFirst("X-Roles")).isEqualTo("ROLE_USER");
    }

    @Test
    void rejectsTokenWithoutUserIdClaim() {
        String jwt = token(null, "attacker", List.of("ROLE_ADMIN"));
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/users/profile")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwt)
                        .build());

        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(any());
    }
}
