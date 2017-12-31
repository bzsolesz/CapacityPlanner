package com.plm.service.child.web;

import com.plm.service.child.domain.Child;
import com.plm.service.child.domain.ChildService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(ChildController.class)
public class ChildControllerTest {

    private static final int TEST_CHILD_ID = 123;
    private static final String TEST_FIRST_NAME = "firstName";
    private static final String TEST_SURNAME = "surname";
    private static final LocalDate TEST_DATE_OF_BIRTH = LocalDate.now();

    @MockBean
    private ChildService childServiceMock;

    @Autowired
    private MockMvc mockMvc;

    private Child testChild;

    @Before
    public void setup(){
        testChild = new Child(TEST_CHILD_ID, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH);
    }

    @Test
    public void shouldReturnTheChildWithIDLookedFor() throws Exception {

        when(childServiceMock.getChildById(TEST_CHILD_ID)).thenReturn(testChild);

        mockMvc.perform(get("/child/{id}", TEST_CHILD_ID).accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(TEST_CHILD_ID))
                .andExpect(jsonPath("$.firstName").value(TEST_FIRST_NAME))
                .andExpect(jsonPath("$.surname").value(TEST_SURNAME))
                .andExpect(jsonPath("$.dateOfBirth").value(
                        TEST_DATE_OF_BIRTH.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))));
    }
}