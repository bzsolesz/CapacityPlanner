package com.plm.service.child.domain.impl;

import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.ChildEntityRepository;
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
    private ChildEntityRepository childEntityRepository;
    @Mock
    private ChildEntity childEntityMock;

    @Before
    public void setup() {

        initMocks(this);

        testedService = new ChildServiceImpl(childEntityRepository);

        when(childEntityRepository.findOne(TEST_CHILD_ID)).thenReturn(childEntityMock);
    }

    @Test
    public void shouldGetChildById() {

        ChildEntity foundChildEntity = testedService.getChildById(TEST_CHILD_ID);

        assertEquals(foundChildEntity, childEntityMock);
    }
}