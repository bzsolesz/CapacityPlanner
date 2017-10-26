package com.plm.child;

import org.junit.Before;
import org.junit.Test;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class GlobalControllerExceptionHandlerTest {

    private GlobalControllerExceptionHandler testedExceptionHandler;

    private MockMvc mockMvc;
    private DummyController dummyController;

    @Before
    public void setUp() throws Exception {

        testedExceptionHandler = new GlobalControllerExceptionHandler();
        dummyController = new DummyController();

        mockMvc = MockMvcBuilders.standaloneSetup(dummyController)
                .setControllerAdvice(testedExceptionHandler)
                .build();
    }

    @Test
    public void shouldReturnHttp404ForResourceNotFound() throws Exception {

        mockMvc.perform(get("/test").accept(APPLICATION_JSON)).andExpect(status().isNotFound());
    }

    @Controller
    private static class DummyController {

        @RequestMapping("/test")
        public String test() {
            throw new EmptyResultDataAccessException(1);
        }
    }
}
