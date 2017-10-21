package com.plm.child;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildDaoImplTest {

    private final String TEST_DB_DRIVER_CLASS = "TEST_DB_DRIVER_CLASS";
    private static final String TEST_DB_URL = "TEST_DB_URL";
    private static final String TEST_DB_USERNAME = "TEST_DB_USERNAME";
    private static final String TEST_DB_PASSWORD = "TEST_DB_PASSWORD";

    private static final int TEST_CHILD_ID = 123;
    private final String TEST_FIRST_NAME = "firstName";
    private final String TEST_SURNAME = "surname";
    private final Date TEST_SQL_DATE_OF_BIRTH = new Date(System.currentTimeMillis());
    private final java.util.Date TEST_DATE_OF_BIRTH = new java.util.Date(TEST_SQL_DATE_OF_BIRTH.getTime());

    private ChildDaoImpl testedDao;
    private DBProperties testDBProperties;
    
    @Mock
    private Connection dbConnectionMock;
    @Mock
    private PreparedStatement getChildByIdStatementMock;
    @Mock
    private ResultSet resultSetMock;

    @Before
    public void setup() throws Exception {

        initMocks(this);

        testDBProperties = new DBProperties();
        testDBProperties.setDriverClass(TEST_DB_DRIVER_CLASS);
        testDBProperties.setUrl(TEST_DB_URL);
        testDBProperties.setUsername(TEST_DB_USERNAME);
        testDBProperties.setPassword(TEST_DB_PASSWORD);

        testedDao = spy(new ChildDaoImpl(testDBProperties));

        doReturn(dbConnectionMock).when(testedDao)
                .createDBConnection(TEST_DB_URL, TEST_DB_USERNAME, TEST_DB_PASSWORD);

        doAnswer(invocationOnMock -> {return null;}).when(testedDao).registerDriverClass(TEST_DB_DRIVER_CLASS);

        when(dbConnectionMock.prepareStatement(ChildDaoImpl.GET_CHILD_BY_ID_QUERY)).thenReturn(getChildByIdStatementMock);
        when(getChildByIdStatementMock.executeQuery()).thenReturn(resultSetMock);
    }

    @Test
    public void shouldCreateDbConnectionBasedOnInputParameters() throws Exception {

        when(resultSetMock.first()).thenReturn(Boolean.TRUE);
        when(resultSetMock.getDate(ChildDaoImpl.CHILD_DATE_OF_BIRTH_COLUMN)).thenReturn(TEST_SQL_DATE_OF_BIRTH);

        testedDao.getChildById(TEST_CHILD_ID);

        verify(testedDao).registerDriverClass(TEST_DB_DRIVER_CLASS);
        verify(testedDao).createDBConnection(TEST_DB_URL, TEST_DB_USERNAME, TEST_DB_PASSWORD);
    }

    @Test(expected = RuntimeException.class)
    public void shouldThrowRuntimeExceptionIfDBDriverCannotBeRegistered() throws ClassNotFoundException, SQLException {

        doThrow(new ClassNotFoundException()).when(testedDao).registerDriverClass(TEST_DB_DRIVER_CLASS);

        when(resultSetMock.first()).thenReturn(Boolean.TRUE);
        when(resultSetMock.getDate(ChildDaoImpl.CHILD_DATE_OF_BIRTH_COLUMN)).thenReturn(TEST_SQL_DATE_OF_BIRTH);

        testedDao.getChildById(TEST_CHILD_ID);
    }

    @Test
    public void shouldPrepareStatementWithChildId() throws SQLException {

        when(resultSetMock.first()).thenReturn(Boolean.TRUE);
        when(resultSetMock.getDate(ChildDaoImpl.CHILD_DATE_OF_BIRTH_COLUMN)).thenReturn(TEST_SQL_DATE_OF_BIRTH);

        testedDao.getChildById(TEST_CHILD_ID);

        verify(dbConnectionMock).prepareStatement(ChildDaoImpl.GET_CHILD_BY_ID_QUERY);
        verify(getChildByIdStatementMock).setInt(1, TEST_CHILD_ID);
    }

    @Test
    public void shouldExecuteGetChildByIdQueryAndReturnFoundChild() throws SQLException {

        when(resultSetMock.first()).thenReturn(Boolean.TRUE);
        when(resultSetMock.getInt(ChildDaoImpl.CHILD_ID_COLUMN)).thenReturn(TEST_CHILD_ID);
        when(resultSetMock.getDate(ChildDaoImpl.CHILD_DATE_OF_BIRTH_COLUMN)).thenReturn(TEST_SQL_DATE_OF_BIRTH);

        Child foundChild = testedDao.getChildById(TEST_CHILD_ID);

        verify(getChildByIdStatementMock).executeQuery();

        assertEquals(TEST_CHILD_ID, foundChild.getId());
    }

    @Test
    public void shouldMapPropertiesOfFoundChild() throws SQLException {

        when(resultSetMock.first()).thenReturn(Boolean.TRUE);
        when(resultSetMock.getInt(ChildDaoImpl.CHILD_ID_COLUMN)).thenReturn(TEST_CHILD_ID);
        when(resultSetMock.getString(ChildDaoImpl.CHILD_FIRST_NAME_COLUMN)).thenReturn(TEST_FIRST_NAME);
        when(resultSetMock.getString(ChildDaoImpl.CHILD_SURNAME_COLUMN)).thenReturn(TEST_SURNAME);
        when(resultSetMock.getDate(ChildDaoImpl.CHILD_DATE_OF_BIRTH_COLUMN)).thenReturn(TEST_SQL_DATE_OF_BIRTH);

        Child foundChild = testedDao.getChildById(TEST_CHILD_ID);

        assertEquals(TEST_FIRST_NAME, foundChild.getFirstName());
        assertEquals(TEST_SURNAME, foundChild.getSurname());
        assertEquals(TEST_DATE_OF_BIRTH, foundChild.getDateOfBirth());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void shouldThrowResourceNotFoundExceptionIfNoChildWasFound() throws SQLException {

        when(resultSetMock.first()).thenReturn(Boolean.FALSE);

        testedDao.getChildById(TEST_CHILD_ID);
    }

    @Test(expected = RuntimeException.class)
    public void shouldRuntimeExceptionIfDatabaseQueryFails() throws SQLException {

        doThrow(new SQLException()).when(testedDao).createDBConnection(anyString(), anyString(), anyString());

        testedDao.getChildById(TEST_CHILD_ID);
    }
}
