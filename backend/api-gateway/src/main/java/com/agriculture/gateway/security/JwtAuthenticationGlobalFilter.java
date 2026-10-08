package com.agriculture.gateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationGlobalFilter implements GlobalFilter, Ordered {
    private static final String USER_ID_HEADER = "X-User-Id";
    private static final String USERNAME_HEADER = "X-Username";
    private static final String ROLES_HEADER = "X-Roles";
    private static final Set<String> CLIENT_IDENTITY_HEADERS = Set.of(
            USER_ID_HEADER.toLowerCase(Locale.ROOT),
            USERNAME_HEADER.toLowerCase(Locale.ROOT),
            ROLES_HEADER.toLowerCase(Locale.ROOT));

    private final String jwtSecret;

    public JwtAuthenticationGlobalFilter(@Value("${app.jwt.secret}") String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        ServerHttpRequest requestWithoutClientIdentity = exchange.getRequest().mutate()
                .headers(headers -> headers.keySet().removeIf(JwtAuthenticationGlobalFilter::isUserHeader))
                .build();
        ServerWebExchange sanitizedExchange = exchange.mutate().request(requestWithoutClientIdentity).build();

        if (isPublicPath(requestWithoutClientIdentity.getPath().pathWithinApplication().value())) {
            return chain.filter(sanitizedExchange);
        }

        String authorization = requestWithoutClientIdentity.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authorization == null || !authorization.regionMatches(true, 0, "Bearer ", 0, 7)) {
            return unauthorized(exchange);
        }

        String token = authorization.substring(7).trim();
        if (token.isEmpty()) {
            return unauthorized(exchange);
        }

        final Claims claims;
        try {
            claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException | IllegalArgumentException exception) {
            return unauthorized(exchange);
        }

        Object userIdClaim = firstClaim(claims, "userId", "id");
        String userId = userIdClaim == null ? null : userIdClaim.toString();
        if (userId == null || userId.isBlank()) {
            return unauthorized(exchange);
        }

        ServerHttpRequest authenticatedRequest = requestWithoutClientIdentity.mutate()
                .headers(headers -> {
                    String username = firstStringClaim(claims, "sub", "username");
                    Object roles = claims.get("roles");
                    headers.set(USER_ID_HEADER, userId);
                    if (username != null) {
                        headers.set(USERNAME_HEADER, username);
                    }
                    if (roles != null) {
                        headers.set(ROLES_HEADER, formatRoles(roles));
                    }
                })
                .build();

        return chain.filter(exchange.mutate().request(authenticatedRequest).build());
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    private static boolean isPublicPath(String path) {
        return path.equals("/api/auth")
                || path.startsWith("/api/auth/")
                || path.equals("/error")
                || path.equals("/actuator/health")
                || path.startsWith("/actuator/health/");
    }

    private static boolean isUserHeader(String headerName) {
        return CLIENT_IDENTITY_HEADERS.contains(headerName.toLowerCase(Locale.ROOT));
    }

    private static Object firstClaim(Claims claims, String... names) {
        for (String name : names) {
            Object value = claims.get(name);
            if (value != null) {
                return value;
            }
        }
        return null;
    }

    private static String firstStringClaim(Claims claims, String... names) {
        for (String name : names) {
            Object value = claims.get(name);
            if (value instanceof String stringValue && !stringValue.isBlank()) {
                return stringValue;
            }
        }
        return null;
    }

    private static String formatRoles(Object roles) {
        if (roles instanceof Collection<?> collection) {
            return collection.stream().map(Object::toString).collect(Collectors.joining(","));
        }
        return roles.toString();
    }

    private static Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}
