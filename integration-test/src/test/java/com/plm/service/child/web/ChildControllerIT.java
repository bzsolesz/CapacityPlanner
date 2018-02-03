package com.plm.service.child.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.plm.service.child.AbstractITBase;
import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.domain.Child;
import org.junit.Test;
import org.springframework.test.web.servlet.ResultActions;

import javax.transaction.Transactional;
import java.time.LocalDate;

import static org.junit.Assert.assertEquals;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ChildControllerIT extends AbstractITBase {

    private static final LocalDate TEST_DATE_OF_BIRTH = LocalDate.now();

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

        response.andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(childEntity.getId()))
                .andExpect(jsonPath("$.firstName").value(updatedChild.getFirstName()))
                .andExpect(jsonPath("$.surname").value(updatedChild.getSurname()));

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

    private ChildEntity persistTestChildEntity() {

        ChildEntity childEntity = new ChildEntity();
        childEntity.setDateOfBirth(TEST_DATE_OF_BIRTH);

        Integer childEntityId = (Integer) testEntityManager.persistAndGetId(childEntity);
        testEntityManager.flush();

        childEntity.setId(childEntityId);

        return childEntity;
    }

    private String childAsJson(Child child) throws JsonProcessingException {

        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.registerModule(new JavaTimeModule());

        return jsonMapper.writeValueAsString(child);
    }
}