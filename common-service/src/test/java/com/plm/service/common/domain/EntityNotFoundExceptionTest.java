package com.plm.service.common.domain;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class EntityNotFoundExceptionTest {

    @Test
    public void shouldInitializeWithNotFoundMessage() throws Exception {

        EntityNotFoundException testedException = new EntityNotFoundException();

        assertNotNull(testedException);
        assertEquals(EntityNotFoundException.MESSAGE, testedException.getMessage());
    }
}
