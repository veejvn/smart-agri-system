package com.agriculture.auth.config;

import com.agriculture.auth.entity.Role;
import com.agriculture.auth.entity.RoleName;
import com.agriculture.auth.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (!roleRepository.findByName(RoleName.ROLE_USER).isPresent()) {
            roleRepository.save(new Role(RoleName.ROLE_USER));
        }
        if (!roleRepository.findByName(RoleName.ROLE_FARMER).isPresent()) {
            roleRepository.save(new Role(RoleName.ROLE_FARMER));
        }
        if (!roleRepository.findByName(RoleName.ROLE_ADMIN).isPresent()) {
            roleRepository.save(new Role(RoleName.ROLE_ADMIN));
        }
    }
}
