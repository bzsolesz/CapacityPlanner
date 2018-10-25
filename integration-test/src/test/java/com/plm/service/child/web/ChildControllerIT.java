package com.plm.service.child.web;

import com.plm.service.child.AbstractITBase;
import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.WeeklyAttendanceEntity;
import com.plm.service.child.domain.Child;
import com.plm.service.child.domain.DailyAttendance;
import com.plm.service.child.domain.WeeklyAttendance;
import org.junit.Test;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ChildControllerIT extends AbstractITBase {

    @Test
    @Transactional
    public void shouldReturnChildById() throws Exception {
        ChildEntity childEntity = persistTestChildEntity();

        mockMvc.perform(get("/child/{id}", childEntity.getId())
                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(childEntity.getId()))
                .andExpect(jsonPath("$.attendance.monday.from").value(timeFormatter.format(MONDAY_FROM)))
                .andExpect(jsonPath("$.attendance.monday.to").value(timeFormatter.format(MONDAY_TO)));
    }

    @Test
    @Transactional
    public void shouldReturnHttp404ForNotFoundChild() throws Exception {
        mockMvc.perform(get("/child/{id}", -999)
                .accept(APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void shouldReturnAllChildren() throws Exception {
        ChildEntity childEntity1 = persistTestChildEntity();
        ChildEntity childEntity2 = persistTestChildEntity();

        mockMvc.perform(get("/child/all")
                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(childEntity1.getId()))
                .andExpect(jsonPath("$[1].id").value(childEntity2.getId()))
                .andExpect(jsonPath("$[0].attendance.monday.from").value(timeFormatter.format(MONDAY_FROM)))
                .andExpect(jsonPath("$[0].attendance.monday.to").value(timeFormatter.format(MONDAY_TO)));
    }

    @Test
    @Transactional
    public void shouldUpdateChild() throws Exception {
        ChildEntity childEntity = persistTestChildEntity();

        WeeklyAttendanceEntity attendanceEntity = childEntity.getAttendance();

        DailyAttendance mondayAttendance = new DailyAttendance(attendanceEntity.getMondayFrom(), attendanceEntity.getMondayTo());
        DailyAttendance tuesdayAttendance = new DailyAttendance(LocalTime.of(9, 30), LocalTime.of(17, 30));

        WeeklyAttendance weeklyAttendance = new WeeklyAttendance.Builder(attendanceEntity.getId())
                .monday(mondayAttendance)
                .tuesday(tuesdayAttendance)
                .build();

        Child updatedChild = new Child(childEntity.getId(), "UPDATED_FIRST_NAME", "UPDATED_SURNAME",
                childEntity.getDateOfBirth(), weeklyAttendance);

        String updatedChildJson = childAsJson(updatedChild);

        ResultActions response = mockMvc.perform(
                put("/child/{id}", childEntity.getId())
                        .contentType(APPLICATION_JSON)
                        .content(updatedChildJson)
                        .accept(APPLICATION_JSON));

        response.andExpect(status().isNoContent());

        ChildEntity updatedChildEntity = testEntityManager.find(ChildEntity.class, childEntity.getId());

        assertEquals(updatedChild.getFirstName(), updatedChildEntity.getFirstName());
        assertEquals(updatedChild.getSurname(), updatedChildEntity.getSurname());
        assertEquals(mondayAttendance.getFrom(), updatedChildEntity.getAttendance().getMondayFrom());
        assertEquals(mondayAttendance.getTo(), updatedChildEntity.getAttendance().getMondayTo());
        assertEquals(tuesdayAttendance.getFrom(), updatedChildEntity.getAttendance().getTuesdayFrom());
        assertEquals(tuesdayAttendance.getTo(), updatedChildEntity.getAttendance().getTuesdayTo());
    }

    @Test
    @Transactional
    public void shouldReturnHttp400ForChildIdMismatchDuringUpdate() throws Exception {
        ChildEntity childEntity = persistTestChildEntity();

        Child child = new Child(childEntity.getId(), null, null, childEntity.getDateOfBirth(), null);

        ResultActions response = mockMvc.perform(
                put("/child/{id}", childEntity.getId() + 1)
                    .contentType(APPLICATION_JSON)
                    .content(childAsJson(child))
                    .accept(APPLICATION_JSON));

        response.andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void shouldAddTheNewChildAndReturnItsId() throws Exception {
        String added_first_name = "ADDED_FIRST_NAME";
        String added_surname = "ADDED_SURNAME";
        DailyAttendance mondayAttendance = new DailyAttendance(LocalTime.of(9, 30), LocalTime.of(17, 30));
        WeeklyAttendance weeklyAttendance = new WeeklyAttendance.Builder(0)
                .monday(mondayAttendance)
                .build();

        Child child = new Child(0, added_first_name, added_surname, LocalDate.now(), weeklyAttendance);

        ResultActions response = mockMvc.perform(
                post("/child")
                        .contentType(APPLICATION_JSON)
                        .content(childAsJson(child))
                        .accept(APPLICATION_JSON));

        response.andExpect(status().isCreated());

        AddedChildView addedChildView = parseAddedChildView(response.andReturn().getResponse().getContentAsString());

        ChildEntity persistedChildEntity = testEntityManager.find(ChildEntity.class, addedChildView.getId());

        assertEquals(added_first_name, persistedChildEntity.getFirstName());
        assertEquals(added_surname, persistedChildEntity.getSurname());
        assertEquals(mondayAttendance.getFrom(), persistedChildEntity.getAttendance().getMondayFrom());
        assertEquals(mondayAttendance.getTo(), persistedChildEntity.getAttendance().getMondayTo());
    }

    @Test
    @Transactional
    public void shouldDeleteTheChild() throws Exception {
        ChildEntity childEntity = persistTestChildEntity();
        WeeklyAttendanceEntity attendanceEntity = childEntity.getAttendance();

        ResultActions response = mockMvc.perform(delete("/child/{id}", childEntity.getId()));

        response.andExpect(status().isNoContent());

        assertNull(testEntityManager.find(ChildEntity.class, childEntity.getId()));
        assertNull(testEntityManager.find(WeeklyAttendanceEntity.class, attendanceEntity.getId()));
    }
}