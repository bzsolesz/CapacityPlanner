package com.plm.service.child.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@Profile("swagger")
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Value("${build.version}")
    private String buildVersion;

    @Bean
    public Docket childServiceSwaggerDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(createChildServiceApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.plm.service.child.web"))
                .paths(PathSelectors.any())
                .build()
                .globalResponseMessage(GET, createHttpGetGlobalResponseMessages())
                .globalResponseMessage(PUT, createHttpPutGlobalResponseMessages())
                .globalResponseMessage(POST, createHttpPostGlobalResponseMessages())
                .globalResponseMessage(DELETE, createHttpDeleteGlobalResponseMessages())
                .useDefaultResponseMessages(false);
    }

    private List<ResponseMessage> createHttpGetGlobalResponseMessages() {
        return Collections.singletonList(
                new ResponseMessage(
                        INTERNAL_SERVER_ERROR.value(),
                        "An error happened during resource lookup!",
                        null, Collections.emptyMap(), Collections.emptyList()));
    }

    private List<ResponseMessage> createHttpPutGlobalResponseMessages() {
        return Arrays.asList(
                new ResponseMessage(
                        NO_CONTENT.value(),
                        "Resource update succeeded.",
                        null, Collections.emptyMap(), Collections.emptyList()),
                new ResponseMessage(
                        INTERNAL_SERVER_ERROR.value(),
                        "An error happened during resource update!",
                        null, Collections.emptyMap(), Collections.emptyList())
        );
    }

    private List<ResponseMessage> createHttpPostGlobalResponseMessages() {
        return Arrays.asList(
                new ResponseMessage(
                        CREATED.value(),
                        "Resource was created.",
                        null, Collections.emptyMap(), Collections.emptyList()),
                new ResponseMessage(
                        INTERNAL_SERVER_ERROR.value(),
                        "An error happened during creating the resource!",
                        null, Collections.emptyMap(), Collections.emptyList())
        );
    }

    private List<ResponseMessage> createHttpDeleteGlobalResponseMessages() {
        return Arrays.asList(
                new ResponseMessage(
                        NO_CONTENT.value(),
                        "Resource delete succeeded.",
                        null, Collections.emptyMap(), Collections.emptyList()),
                new ResponseMessage(
                        INTERNAL_SERVER_ERROR.value(),
                        "An error happened during resource delete!",
                        null, Collections.emptyMap(), Collections.emptyList())
        );
    }

    private ApiInfo createChildServiceApiInfo() {
        return new ApiInfo(
                "API Documentation of ChildService",
                "API Documentation of service methods dealing with Children's Information",
                this.buildVersion,
                "", null, "", "", new ArrayList<>());
    }

}
