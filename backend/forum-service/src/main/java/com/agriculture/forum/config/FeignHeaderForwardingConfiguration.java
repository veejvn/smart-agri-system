package com.agriculture.forum.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignHeaderForwardingConfiguration {

    @Bean
    public RequestInterceptor serviceIdentityInterceptor() {
        return template -> template.header("X-Service-Name", "forum-service");
    }
}
