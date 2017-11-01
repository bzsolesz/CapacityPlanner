package com.plm.service.child.web;

import com.plm.service.child.dao.ChildEntity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.util.Date;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT
)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
@TestPropertySource(locations="classpath:application-integration_test.properties")
public class ChildControllerIT {

    private static final Date TEST_DATE_OF_BIRTH = new Date();

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private MockMvc mockMvc;

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

    @Test()
    @Transactional
    public void shouldReturnHttp404ForNotFoundChild() throws Exception {

        mockMvc.perform(get("/child/{id}", 1)
                .accept(APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
