package com.plm.child;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.assertEquals;

public class ChildTest {

    private static final int TEST_ID = 123;
    private final String TEST_FIRST_NAME = "firstName";
    private final String TEST_SURNAME = "surname";
    private final Date TEST_DATE_OF_BIRTH = new Date();
    private Child testedChild;

    @Before
    public void setup() {
        testedChild = new Child(TEST_ID, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH);
    }

    @Test
    public void shouldReturnChildNameAndDateOfBirth() {
        assertEquals(TEST_ID, testedChild.getId());
        assertEquals(TEST_FIRST_NAME, testedChild.getFirstName());
        assertEquals(TEST_SURNAME, testedChild.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, testedChild.getDateOfBirth());
    }
}
