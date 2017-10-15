package com.plm.child;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ChildControllerTest {

    private static final int TEST_CHILD_ID = 123;
    private final String TEST_FIRST_NAME = "firstName";
    private final String TEST_SURNAME = "surname";
    private final Date TEST_DATE_OF_BIRTH = new Date();

    @Mock
    private ChildService childServiceMock;

    private ChildController testedController;

    private MockMvc mockMvc;

    @Before
    public void setup(){

        initMocks(this);

        testedController = new ChildController(childServiceMock);

        mockMvc = MockMvcBuilders.standaloneSetup(testedController).build();
    }

    @Test
    public void shouldReturnTheChildWithIDLookedFor() throws Exception {

        Child testChild = new Child(TEST_CHILD_ID, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH);

        when(childServiceMock.getChildById(TEST_CHILD_ID)).thenReturn(testChild);

        String testUrl = "/child/" + TEST_CHILD_ID;

        mockMvc.perform(get(testUrl).accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TEST_CHILD_ID))
                .andExpect(jsonPath("$.firstName").value(TEST_FIRST_NAME))
                .andExpect(jsonPath("$.surname").value(TEST_SURNAME))
                .andExpect(jsonPath("$.dateOfBirth").value(
                        new SimpleDateFormat("dd/MM/YYYY").format(TEST_DATE_OF_BIRTH)));
    }

    @Test
    public void shouldReturn404IfChildNotFound() throws Exception {

        when(childServiceMock.getChildById(anyInt())).thenThrow(new ResourceNotFoundException(""));

        mockMvc.perform(get("/child/999").accept(APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}