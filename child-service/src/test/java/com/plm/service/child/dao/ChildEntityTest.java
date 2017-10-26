package com.plm.service.child.dao;

import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ChildEntityTest {

    private static final int TEST_ID = 123;
    private final String TEST_FIRST_NAME = "firstName";
    private final String TEST_SURNAME = "surname";
    private final Date TEST_DATE_OF_BIRTH = new Date();

    private ChildEntity testedChildEntity;

    @Test
    public void shouldHaveStandardGettersAndSetters() {

        testedChildEntity = new ChildEntity();
        testedChildEntity.setId(TEST_ID);
        testedChildEntity.setFirstName(TEST_FIRST_NAME);
        testedChildEntity.setSurname(TEST_SURNAME);
        testedChildEntity.setDateOfBirth(TEST_DATE_OF_BIRTH);

        assertNotNull(testedChildEntity);
        assertEquals(TEST_ID, testedChildEntity.getId());
        assertEquals(TEST_FIRST_NAME, testedChildEntity.getFirstName());
        assertEquals(TEST_SURNAME, testedChildEntity.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, testedChildEntity.getDateOfBirth());
    }
}
