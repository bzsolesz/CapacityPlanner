package com.plm.children;

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

public class ChildrenControllerTest {

    @Mock
    private ChildrenService childrenServiceMock;

    @InjectMocks
    private ChildrenController testedController;

    private MockMvc mockMvc;

    @Before
    public void setup(){
        initMocks(this);

        mockMvc = MockMvcBuilders.standaloneSetup(testedController).build();
    }

    @Test
    public void shouldIntroduceItself() throws Exception {

        when(childrenServiceMock.index()).thenReturn("This is the children controller!");

        mockMvc.perform(get("/child").accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo("This is the children controller!")));
    }
}
