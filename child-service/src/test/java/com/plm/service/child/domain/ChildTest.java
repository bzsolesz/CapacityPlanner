package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.WeeklyAttendanceEntity;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildTest {
    private static final int CHILD_ID = 123;
    private static final int ATTENDANCE_ID = 456;
    private static final String TEST_FIRST_NAME = "firstName";
    private static final String TEST_SURNAME = "surname";
    private static final LocalDate TEST_DATE_OF_BIRTH = LocalDate.now();

    private Child testedChild;

    @Mock
    private ChildEntity childEntityMock;
    @Mock
    private WeeklyAttendance attendanceMock;
    @Mock
    private WeeklyAttendanceEntity attendanceEntityMock;

    @Before
    public void setUp() {
        initMocks(this);

        testedChild = new Child(CHILD_ID, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH);

        when(childEntityMock.getId()).thenReturn(CHILD_ID);
        when(childEntityMock.getFirstName()).thenReturn(TEST_FIRST_NAME);
        when(childEntityMock.getSurname()).thenReturn(TEST_SURNAME);
        when(childEntityMock.getDateOfBirth()).thenReturn(TEST_DATE_OF_BIRTH);
        when(childEntityMock.getAttendance()).thenReturn(attendanceEntityMock);

        when(attendanceMock.asEntity()).thenReturn(attendanceEntityMock);
        when(attendanceEntityMock.getId()).thenReturn(ATTENDANCE_ID);
    }

    @Test
    public void shouldReturnItsFieldValues() {
        expectPopulatedChild();
    }

    @Test
    public void couldBeCreatedFromChildEntity() {
        testedChild = new Child(childEntityMock);

        expectPopulatedChild();
        assertEquals(ATTENDANCE_ID, testedChild.getAttendance().getId());
    }

    @Test
    public void couldBeCreatedFromChildEntityWithoutAttendance() {
        when(childEntityMock.getAttendance()).thenReturn(null);

        testedChild = new Child(childEntityMock);

        assertNull(testedChild.getAttendance());
    }

    @Test
    public void couldBeCreatedWithEmptyConstructorAndSetters() {
        testedChild = new Child();
        testedChild.setId(CHILD_ID);
        testedChild.setFirstName(TEST_FIRST_NAME);
        testedChild.setSurname(TEST_SURNAME);
        testedChild.setDateOfBirth(TEST_DATE_OF_BIRTH);
        testedChild.setAttendance(attendanceMock);

        expectPopulatedChild();
        assertEquals(attendanceMock, testedChild.getAttendance());
    }

    @Test
    public void couldBeTransformedIntoAChildEntity() {
        testedChild.setAttendance(attendanceMock);

        ChildEntity childEntity = testedChild.asEntity();

        assertEquals(CHILD_ID, childEntity.getId());
        assertEquals(TEST_FIRST_NAME, childEntity.getFirstName());
        assertEquals(TEST_SURNAME, childEntity.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, childEntity.getDateOfBirth());
        assertEquals(attendanceEntityMock, childEntity.getAttendance());
    }

    @Test
    public void couldBeTransformedIntoAChildEntityWithoutAttendance() {
        ChildEntity childEntity = testedChild.asEntity();

        assertNull(childEntity.getAttendance());
    }

    @Test
    public void shouldGenerateHashCodeFromItsId() {
        assertEquals(CHILD_ID, testedChild.hashCode());
    }

    @Test
    public void shouldBeEqualWithItself() {
        assertTrue(testedChild.equals(testedChild));
    }

    @Test
    public void shouldBeEqualWithAnotherChildInstanceWithTheSameId() {
        assertTrue(testedChild.equals(new Child(CHILD_ID, null, null, null)));
    }

    @Test
    public void shouldNotBeEqualWithNull() {
        assertFalse(testedChild.equals(null));
    }

    @Test
    public void shouldNotBeEqualWithAnInstanceOfAnotherClass() {
        assertFalse(testedChild.equals(new Object()));
    }

    @Test
    public void shouldNotBeEqualWithAChildWithDifferentId() {
        assertFalse(testedChild.equals(new Child(CHILD_ID + 1, TEST_FIRST_NAME, TEST_SURNAME, TEST_DATE_OF_BIRTH)));
    }
    private void expectPopulatedChild() {
        assertEquals(CHILD_ID, testedChild.getId());
        assertEquals(TEST_FIRST_NAME, testedChild.getFirstName());
        assertEquals(TEST_SURNAME, testedChild.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, testedChild.getDateOfBirth());
    }
}
