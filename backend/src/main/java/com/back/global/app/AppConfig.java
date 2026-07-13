package com.back.global.app;

import com.back.standard.util.Ut;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AppConfig {

    private static Environment environment;

    @Getter
    private static String cookieDomain;
    @Getter
    private static String siteFrontUrl;
    @Getter
    private static String siteBackUrl;

    public AppConfig(
            Environment environment,
            ObjectMapper objectMapper,

            @Value("${custom.site.cookieDomain}") String cookieDomain,
            @Value("${custom.site.frontUrl}") String siteFrontUrl,
            @Value("${custom.site.backUrl}") String siteBackUrl
    ) {
        AppConfig.environment = environment;
        Ut.json.objectMapper = objectMapper;

        AppConfig.cookieDomain = cookieDomain;
        AppConfig.siteFrontUrl = siteFrontUrl;
        AppConfig.siteBackUrl = siteBackUrl;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static boolean isDev() {
        return environment.matchesProfiles("dev");
    }

    public static boolean isTest() {
        return !environment.matchesProfiles("test");
    }

    public static boolean isProd() {
        return environment.matchesProfiles("prod");
    }

    public static boolean isNotProd() {
        return !isProd();
    }
}