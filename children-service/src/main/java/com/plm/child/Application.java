package com.plm.child;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@SpringBootApplication
@EnableSwagger2
public class Application extends SpringBootServletInitializer {

    @Value("${build.version}")
    private String buildVersion;

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }

    public static void main(String[] arguments) {
        SpringApplication.run(Application.class, arguments);
    }

    @Bean
    public Docket swaggerConfiguration() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(createChildServiceApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.plm.child"))
                .paths(PathSelectors.any())
                .build()
                .useDefaultResponseMessages(false);
    }

    private ApiInfo createChildServiceApiInfo() {
        return new ApiInfo(
                "API Documentation of ChildService",
                "API Documentation of service methods dealing with Children's Information",
                this.buildVersion,
                "", null, "", "", new ArrayList<>());
    }
}
