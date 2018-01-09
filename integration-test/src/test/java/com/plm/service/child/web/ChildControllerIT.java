package com.plm.service.child.web;

import com.plm.service.child.AbstractITBase;
import com.plm.service.child.dao.ChildEntity;
import org.junit.Test;

import javax.transaction.Transactional;
import java.time.LocalDate;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

    private ChildEntity persistTestChildEntity() {

        ChildEntity childEntity = new ChildEntity();
        childEntity.setDateOfBirth(TEST_DATE_OF_BIRTH);

        Integer childEntityId = (Integer) testEntityManager.persistAndGetId(childEntity);
        testEntityManager.flush();

        childEntity.setId(childEntityId);

        return childEntity;
    }
}