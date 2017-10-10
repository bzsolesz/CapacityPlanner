package com.plm.children;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class ChildrenServiceTest {

    private ChildrenService testedService;

    @Before
    public void setup() {
        testedService = new ChildrenService();
    }

    @Test
    public void shouldIntroduceItself() {
        assertEquals("This is the children controller!", testedService.index());
    }
}
