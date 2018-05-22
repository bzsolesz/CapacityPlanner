package com.plm.service.child.web;

import com.plm.service.child.AbstractITBase;
import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.domain.Child;
import org.junit.Test;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;
import static org.springframework.http.MediaType.APPLICATION_JSON;
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
                .andExpect(jsonPath("$.id").value(childEntity.getId()));
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
                .andExpect(jsonPath("$[1].id").value(childEntity2.getId()));
    }

    @Test
    @Transactional
    public void shouldUpdateChild() throws Exception {

        ChildEntity childEntity = persistTestChildEntity();

        Child updatedChild =
                new Child(childEntity.getId(), "UPDATED_FIRST_NAME", "UPDATED_SURNAME", childEntity.getDateOfBirth());

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
    }

    @Test
    @Transactional
    public void shouldReturnHttp400ForChildIdMismatchDuringUpdate() throws Exception {

        ChildEntity childEntity = persistTestChildEntity();

        Child child = new Child(childEntity.getId(), null, null, childEntity.getDateOfBirth());

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
        Child child = new Child(0, added_first_name, added_surname, LocalDate.now());

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
    }
}