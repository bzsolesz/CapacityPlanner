package com.plm.service.child;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMethod;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Profile("swagger")
@Configuration()
public class SwaggerConfiguration {

    @Value("${build.version}")
    private String buildVersion;

    @Bean
    public Docket childServiceSwaggerDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(createChildServiceApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.plm.service.child"))
                .paths(PathSelectors.any())
                .build()
                .globalResponseMessage(RequestMethod.GET, createHttpGetGlobalResponseMessages())
                .useDefaultResponseMessages(false);
    }

    private List<ResponseMessage> createHttpGetGlobalResponseMessages() {
        return Arrays.asList(
                createGlobalResponseMessage(HttpStatus.NOT_FOUND, "Requested entity was not found!"),
                createGlobalResponseMessage(HttpStatus.INTERNAL_SERVER_ERROR, "An error happened during entity lookup!")
        );
    }

    private ResponseMessage createGlobalResponseMessage(HttpStatus httpStatus, String message) {
        return new ResponseMessage(httpStatus.value(), message, null,
                Collections.EMPTY_MAP, Collections.EMPTY_LIST);
    }

    private ApiInfo createChildServiceApiInfo() {
        return new ApiInfo(
                "API Documentation of ChildService",
                "API Documentation of service methods dealing with Children's Information",
                this.buildVersion,
                "", null, "", "", new ArrayList<>());
    }

}
