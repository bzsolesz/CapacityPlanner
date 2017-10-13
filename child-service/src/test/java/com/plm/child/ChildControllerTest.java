package com.plm.child;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ChildControllerTest {

    @Mock
    private ChildService childServiceMock;

    @InjectMocks
    private ChildController testedController;

    private MockMvc mockMvc;

    @Before
    public void setup(){
        initMocks(this);

        mockMvc = MockMvcBuilders.standaloneSetup(testedController).build();
    }

    @Test
    public void shouldIntroduceItself() throws Exception {

        when(childServiceMock.index()).thenReturn("This is the child controller!");

        mockMvc.perform(get("/child").accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("This is the child controller!")));
    }
}
