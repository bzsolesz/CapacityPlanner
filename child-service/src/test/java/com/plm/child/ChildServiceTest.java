package com.plm.child;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ChildServiceTest {

    private ChildService testedService;

    @Before
    public void setup() {
        testedService = new ChildService();
    }

    @Test
    public void shouldIntroduceItself() {
        assertEquals("This is the child controller!", testedService.index());
    }
}
