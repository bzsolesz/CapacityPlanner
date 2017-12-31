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

        ChildEntity childEntity = new ChildEntity();
        childEntity.setDateOfBirth(TEST_DATE_OF_BIRTH);

        Integer testChildId = (Integer) testEntityManager.persistAndGetId(childEntity);

        testEntityManager.flush();

        mockMvc.perform(get("/child/{id}", testChildId)
                .accept(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testChildId));
    }

    @Test
    @Transactional
    public void shouldReturnHttp404ForNotFoundChild() throws Exception {

        mockMvc.perform(get("/child/{id}", 1)
                .accept(APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}