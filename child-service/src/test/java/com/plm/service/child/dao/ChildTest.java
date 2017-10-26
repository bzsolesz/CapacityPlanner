package com.plm.service.child.dao;

import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ChildTest {

    private static final int TEST_ID = 123;
    private final String TEST_FIRST_NAME = "firstName";
    private final String TEST_SURNAME = "surname";
    private final Date TEST_DATE_OF_BIRTH = new Date();

    private Child testedChild;

    @Test
    public void shouldCreateChildWithData() throws Exception {

        testedChild = new Child(TEST_ID, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH);

        assertNotNull(testedChild);
        assertEquals(TEST_ID, testedChild.getId());
        assertEquals(TEST_FIRST_NAME, testedChild.getFirstName());
        assertEquals(TEST_SURNAME, testedChild.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, testedChild.getDateOfBirth());
    }

    @Test
    public void shouldChildWithDataSettersAndGetters() {

        testedChild = new Child();
        testedChild.setId(TEST_ID);
        testedChild.setFirstName(TEST_FIRST_NAME);
        testedChild.setSurname(TEST_SURNAME);
        testedChild.setDateOfBirth(TEST_DATE_OF_BIRTH);

        assertNotNull(testedChild);
        assertEquals(TEST_ID, testedChild.getId());
        assertEquals(TEST_FIRST_NAME, testedChild.getFirstName());
        assertEquals(TEST_SURNAME, testedChild.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, testedChild.getDateOfBirth());
    }
}
