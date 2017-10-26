package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntity;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildTest {

    private static final int TEST_ID = 123;
    private final String TEST_FIRST_NAME = "firstName";
    private final String TEST_SURNAME = "surname";
    private final Date TEST_DATE_OF_BIRTH = new Date();

    private Child testedChild;

    @Mock
    private ChildEntity childEntityMock;

    @Before
    public void setUp() throws Exception {

        initMocks(this);

        testedChild = new Child(TEST_ID, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH);

        when(childEntityMock.getId()).thenReturn(TEST_ID);
        when(childEntityMock.getFirstName()).thenReturn(TEST_FIRST_NAME);
        when(childEntityMock.getSurname()).thenReturn(TEST_SURNAME);
        when(childEntityMock.getDateOfBirth()).thenReturn(TEST_DATE_OF_BIRTH);
    }

    @Test
    public void shouldReturnItsFieldValues() throws Exception {

        assertEquals(TEST_ID, testedChild.getId());
        assertEquals(TEST_FIRST_NAME, testedChild.getFirstName());
        assertEquals(TEST_SURNAME, testedChild.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, testedChild.getDateOfBirth());
    }

    @Test
    public void couldBeCreatedFromChildEntity() throws Exception {

        testedChild = new Child(childEntityMock);

        assertEquals(TEST_ID, testedChild.getId());
        assertEquals(TEST_FIRST_NAME, testedChild.getFirstName());
        assertEquals(TEST_SURNAME, testedChild.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, testedChild.getDateOfBirth());
    }
}
