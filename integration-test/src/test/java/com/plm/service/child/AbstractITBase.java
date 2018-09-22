package com.plm.service.child;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.WeeklyAttendanceEntity;
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
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RunWith(SpringRunner.class)
@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase
@AutoConfigureTestEntityManager
@TestPropertySource(locations="classpath:application-integration_test.properties")
public class AbstractITBase {
    protected static final String FIRST_NAME = "FIRST_NAME";
    protected static final String SURNAME = "SURNAME";
    protected static final LocalDate DATE_OF_BIRTH = LocalDate.now();
    protected static final LocalTime MONDAY_FROM = LocalTime.of(8, 30);
    protected static final LocalTime MONDAY_TO = LocalTime.of(18, 30);

    protected static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

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
        WeeklyAttendanceEntity weeklyAttendanceEntity = new WeeklyAttendanceEntity();
        weeklyAttendanceEntity.setMondayFrom(MONDAY_FROM);
        weeklyAttendanceEntity.setMondayTo(MONDAY_TO);

        ChildEntity childEntity = new ChildEntity();
        childEntity.setFirstName(FIRST_NAME);
        childEntity.setSurname(SURNAME);
        childEntity.setDateOfBirth(DATE_OF_BIRTH);
        childEntity.setAttendance(weeklyAttendanceEntity);

        Integer childEntityId = (Integer) testEntityManager.persistAndGetId(childEntity);
        testEntityManager.flush();

        childEntity.setId(childEntityId);

        return childEntity;
    }
}