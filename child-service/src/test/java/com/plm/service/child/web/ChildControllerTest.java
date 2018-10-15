package com.plm.service.child.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.plm.service.child.domain.Child;
import com.plm.service.child.domain.ChildService;
import com.plm.service.child.domain.DailyAttendance;
import com.plm.service.child.domain.WeeklyAttendance;
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
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(ChildController.class)
public class ChildControllerTest {

    private static final String MONDAY_FROM = "08:30";
    private static final String MONDAY_TO = "18:30";

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
    public void shouldNotReturnChildAttendanceIfNotSet() throws Exception {
        testChild1.setAttendance(null);

        int testChildId = testChild1.getId();

        when(childServiceMock.getChildById(testChildId)).thenReturn(testChild1);

        ResultActions response = mockMvc.perform(get("/child/{id}", testChildId).accept(APPLICATION_JSON));

        response.andExpect(status().isOk())
                .andExpect(jsonPath("$.attendance").doesNotExist());
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

    @Test
    public void shouldNotReturnChildrenAttendanceIfNotSet() throws Exception {
        testChild1.setAttendance(null);
        testChild2.setAttendance(null);

        when(childServiceMock.getAllChildren()).thenReturn(
                new LinkedHashSet<>(Arrays.asList(testChild1, testChild2)));

        ResultActions response = mockMvc.perform(get("/child/all").accept(APPLICATION_JSON));

        response.andExpect(status().isOk())
                .andExpect(jsonPath("$[0].attendance").doesNotExist())
                .andExpect(jsonPath("$[1].attendance").doesNotExist());
    }

    @Test
    public void shouldUpdateTheChild() throws Exception {

        testChild2 = initTestChild(testChild1.getId());

        doAnswer(invocationOnMock -> {

            Child child = invocationOnMock.getArgumentAt(0, Child.class);

            assertEquals(child, testChild1);

            return testChild2;

        }).when(childServiceMock).updateChild(any(Child.class));

        ResultActions response = mockMvc.perform(
                put("/child/{id}", testChild1.getId())
                        .content(childAsJson(testChild1))
                        .contentType(APPLICATION_JSON)
                        .accept(APPLICATION_JSON));

        response.andExpect(status().isNoContent());

        verify(childServiceMock).updateChild(any(Child.class));
    }

    @Test
    public void shouldReturnBadRequestIfChildIdToUpdateIsDifferentInUrlPath() throws Exception {

        ResultActions response = mockMvc.perform(
                put("/child/{id}", testChild1.getId() + 1)
                        .content(childAsJson(testChild1))
                        .contentType(APPLICATION_JSON)
                        .accept(APPLICATION_JSON));

        response.andExpect(status().isBadRequest());
    }

    @Test
    public void shouldAddAChildAndReturnItsId() throws Exception {

        int addedChildId = 3;

        when(childServiceMock.addChild(testChild1)).thenReturn(addedChildId);

        ResultActions response = mockMvc.perform(
                post("/child")
                        .content(childAsJson(testChild1))
                        .contentType(APPLICATION_JSON)
                        .accept(APPLICATION_JSON));

        response.andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(addedChildId));
    }

    @Test
    public void shouldDeleteTheChild() throws Exception {
        int childId = 123;

        mockMvc.perform(delete("/child/{id}", childId)).andExpect(status().isNoContent());

        verify(childServiceMock).deleteChild(childId);
    }

    private void expectChildJSON(ResultActions response, String rootPath, Child child) throws Exception {

        response.andExpect(jsonPath(rootPath + ".id").value(child.getId()))
                .andExpect(jsonPath(rootPath + ".firstName").value(child.getFirstName()))
                .andExpect(jsonPath(rootPath + ".surname").value(child.getSurname()))
                .andExpect(jsonPath(rootPath + ".dateOfBirth").value(
                        child.getDateOfBirth().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))));

        response.andExpect(jsonPath(rootPath + ".attendance.monday.from").value(MONDAY_FROM))
                .andExpect(jsonPath(rootPath + ".attendance.monday.to").value(MONDAY_TO))
                .andExpect(jsonPath(rootPath + ".attendance.tuesday").doesNotExist());
    }

    private Child initTestChild(int id) {
        DailyAttendance mondayAttendance = new DailyAttendance(LocalTime.of(8, 30), LocalTime.of(18, 30 ));
        WeeklyAttendance weeklyAttendance = new WeeklyAttendance.Builder(id).monday(mondayAttendance).build();

        return new Child(id, "firstName" + id, "surname" + id, LocalDate.now(), weeklyAttendance);
    }

    private String childAsJson(Child child) throws JsonProcessingException {

        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.registerModule(new JavaTimeModule());

        return jsonMapper.writeValueAsString(child);
    }
}