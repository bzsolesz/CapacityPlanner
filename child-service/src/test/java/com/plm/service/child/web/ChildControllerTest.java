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
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;

import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(ChildController.class)
public class ChildControllerTest {

    @MockBean
    private ChildService childServiceMock;

    @Autowired
    private MockMvc mockMvc;

    private Child testChild1;
    private Child testChild2;

    @Before
    public void setup(){
        testChild1 = initTestChild(1);
        testChild2 = initTestChild(2);
    }

    @Test
    public void shouldReturnTheChildWithIDLookedFor() throws Exception {

        int testChildId = testChild1.getId();

        when(childServiceMock.getChildById(testChildId)).thenReturn(testChild1);

        ResultActions response = mockMvc.perform(get("/child/{id}", testChildId).accept(APPLICATION_JSON));

        response.andExpect(status().isOk());

        expectChildJSON(response, "$", testChild1);
    }

    @Test
    public void shouldReturnEmptySetIfNoChild() throws Exception {

        when(childServiceMock.getAllChildren()).thenReturn(Collections.emptySet());

        mockMvc.perform(get("/child/all").accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    public void shouldReturnAllChildren() throws Exception {

        when(childServiceMock.getAllChildren()).thenReturn(
                new LinkedHashSet<>(Arrays.asList(testChild1, testChild2)));

        ResultActions response = mockMvc.perform(get("/child/all").accept(APPLICATION_JSON));

        response.andExpect(status().isOk());

        expectChildJSON(response, "$[0]", testChild1);
        expectChildJSON(response, "$[1]", testChild2);
    }

    private void expectChildJSON(ResultActions response, String jsonPath, Child child) throws Exception {

        response.andExpect(jsonPath(jsonPath + ".id").value(child.getId()))
                .andExpect(jsonPath(jsonPath + ".firstName").value(child.getFirstName()))
                .andExpect(jsonPath(jsonPath + ".surname").value(child.getSurname()))
                .andExpect(jsonPath(jsonPath + ".dateOfBirth").value(
                        child.getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))));
    }

    private Child initTestChild(int id) {
        return new Child(id, "firstName" + id, "surname" + id, LocalDate.now());
    }
}