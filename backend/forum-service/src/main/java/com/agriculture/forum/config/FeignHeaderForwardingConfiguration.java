package com.agriculture.forum.config;

import jakarta.servlet.http.HttpServletRequest;
import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Configuration
public class FeignHeaderForwardingConfiguration {

    private static final String[] GATEWAY_HEADERS = {"X-User-Id", "X-Username", "X-Roles"};

    @Bean
    public RequestInterceptor gatewayHeaderForwardingInterceptor() {
        return template -> {
            if (!(RequestContextHolder.getRequestAttributes() instanceof ServletRequestAttributes attributes)) {
                return;
            }

            HttpServletRequest request = attributes.getRequest();
            for (String header : GATEWAY_HEADERS) {
                String value = request.getHeader(header);
                if (value != null) {
                    template.header(header, value);
                }
            }
        };
    }
}
