package com.plm.service.child.domain.impl;

import com.plm.service.child.dao.ChildRepository;
import com.plm.service.child.dao.Child;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildServiceImplTest {

    private static final int TEST_CHILD_ID = 123;

    private ChildServiceImpl testedService;

    @Mock
    private ChildRepository childRepository;
    @Mock
    private Child childMock;

    @Before
    public void setup() {

        initMocks(this);

        testedService = new ChildServiceImpl(childRepository);

        when(childRepository.findOne(TEST_CHILD_ID)).thenReturn(childMock);
    }

    @Test
    public void shouldGetChildById() {

        Child foundChild = testedService.getChildById(TEST_CHILD_ID);

        assertEquals(foundChild, childMock);
    }
}