package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntity;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildTest {

    private static final int TEST_ID = 123;
    private final String TEST_FIRST_NAME = "firstName";
    private final String TEST_SURNAME = "surname";
    private final LocalDate TEST_DATE_OF_BIRTH = LocalDate.now();

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

    @Test
    public void couldBeCreatedWithEmptyConstructorAndSetters() throws Exception {

        testedChild = new Child();
        testedChild.setId(TEST_ID);
        testedChild.setFirstName(TEST_FIRST_NAME);
        testedChild.setSurname(TEST_SURNAME);
        testedChild.setDateOfBirth(TEST_DATE_OF_BIRTH);

        when(childEntityMock.getId()).thenReturn(TEST_ID);
        when(childEntityMock.getFirstName()).thenReturn(TEST_FIRST_NAME);
        when(childEntityMock.getSurname()).thenReturn(TEST_SURNAME);
        when(childEntityMock.getDateOfBirth()).thenReturn(TEST_DATE_OF_BIRTH);
    }

    @Test
    public void couldBeTransformedIntoAChildEntity() throws Exception {
        
        ChildEntity childEntity = testedChild.asChildEntity();

        assertEquals(TEST_ID, childEntity.getId());
        assertEquals(TEST_FIRST_NAME, childEntity.getFirstName());
        assertEquals(TEST_SURNAME, childEntity.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, childEntity.getDateOfBirth());
    }

    @Test
    public void shouldGenerateHashCodeFromItsId() throws Exception {
        assertEquals(TEST_ID, testedChild.hashCode());
    }

    @Test
    public void shouldBeEqualWithItself() throws Exception {
        assertTrue(testedChild.equals(testedChild));
    }

    @Test
    public void shouldBeEqualWithAnotherChildInstanceWithTheSameId() throws Exception {
        assertTrue(testedChild.equals(new Child(TEST_ID, null, null, null)));
    }

    @Test
    public void shouldNotBeEqualWithNull() throws Exception {
        assertFalse(testedChild.equals(null));
    }

    @Test
    public void shouldNotBeEqualWithAnInstanceOfAnotherClass() throws Exception {
        assertFalse(testedChild.equals(new Object()));
    }

    @Test
    public void shouldNotBeEqualWithAChildWithDifferentId() throws Exception {
        assertFalse(testedChild.equals(new Child(TEST_ID + 1, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH)));
    }
}
