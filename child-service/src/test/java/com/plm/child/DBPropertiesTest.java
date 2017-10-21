package com.plm.child;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class DBPropertiesTest {

    private static final String TEST_DRIVER_CLASS = "TEST_DRIVER_CLASS";
    private static final String TEST_URL = "TEST_URL";
    private static final String TEST_USERNAME = "TEST_USERNAME";
    private static final String TEST_PASSWORD = "TEST_PASSWORD";

    private DBProperties testedProperties;

    @Before
    public void setup() {
        testedProperties = new DBProperties();
        testedProperties.setDriverClass(TEST_DRIVER_CLASS);
        testedProperties.setUrl(TEST_URL);
        testedProperties.setUsername(TEST_USERNAME);
        testedProperties.setPassword(TEST_PASSWORD);
    }

    @Test
    public void shouldReturnItsProperties() {
        assertEquals(TEST_DRIVER_CLASS, testedProperties.getDriverClass());
        assertEquals(TEST_URL, testedProperties.getUrl());
        assertEquals(TEST_USERNAME, testedProperties.getUsername());
        assertEquals(TEST_PASSWORD, testedProperties.getPassword());
    }
}
