package com.plm.child;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildServiceImplTest {

    private static final int TEST_CHILD_ID = 123;

    private ChildServiceImpl testedService;

    @Mock
    private ChildDao childDaoMock;
    @Mock
    private Child childMock;

    @Before
    public void setup() {

        initMocks(this);

        testedService = new ChildServiceImpl(childDaoMock);

        when(childDaoMock.getChildById(TEST_CHILD_ID)).thenReturn(childMock);
    }

    @Test
    public void shouldGetChildById() {

        Child foundChild = testedService.getChildById(TEST_CHILD_ID);

        assertEquals(foundChild, childMock);
    }

    @Test(expected = ResourceNotFoundException.class)
    public void shouldThrowResourceNotFoundExceptionIfChildWasNotFound() {

        when(childDaoMock.getChildById(anyInt())).thenThrow(new ResourceNotFoundException(""));

        testedService.getChildById(TEST_CHILD_ID);
    }
}
