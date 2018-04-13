package com.plm.service.child;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.domain.Child;
import com.plm.service.child.web.AddedChildView;
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

import java.io.IOException;
import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
@TestPropertySource(locations="classpath:application-integration_test.properties")
public class AbstractITBase {

    protected static final LocalDate TEST_DATE_OF_BIRTH = LocalDate.now();

    @Autowired
    protected TestEntityManager testEntityManager;

    @Autowired
    protected MockMvc mockMvc;

    protected String childAsJson(Child child) throws JsonProcessingException {

        ObjectMapper jsonMapper = new ObjectMapper();
        jsonMapper.registerModule(new JavaTimeModule());

        return jsonMapper.writeValueAsString(child);
    }

    protected AddedChildView parseAddedChildView(String addedChildViewString) throws IOException {
        ObjectMapper jsonMapper = new ObjectMapper();

        return jsonMapper.readValue(addedChildViewString, AddedChildView.class);
    }

    protected ChildEntity persistTestChildEntity() {

        ChildEntity childEntity = new ChildEntity();
        childEntity.setDateOfBirth(TEST_DATE_OF_BIRTH);

        Integer childEntityId = (Integer) testEntityManager.persistAndGetId(childEntity);
        testEntityManager.flush();

        childEntity.setId(childEntityId);

        return childEntity;
    }
}