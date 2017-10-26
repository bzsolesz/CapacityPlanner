package com.plm.child;

import org.junit.Before;
import org.junit.Test;

public class EntityNotFoundRepositoryAspectTest {

    private EntityNotFoundRepositoryAspect testedAspect;

    @Before
    public void setUp() throws Exception {
        testedAspect = new EntityNotFoundRepositoryAspect();
    }

    @Test(expected = EntityNotFoundException.class)
    public void shouldThrowEntityNotFoundExceptionIfReturningEntityIsNull() throws Exception {
        testedAspect.throwEntityNotFoundExceptionIfReturningEntityIsNull(null);
    }

    @Test
    public void shouldRunSuccessfullyIfReturningEntityIsNotNull() throws Exception {
        testedAspect.throwEntityNotFoundExceptionIfReturningEntityIsNull(new Object());
    }
}
