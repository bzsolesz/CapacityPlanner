package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.ChildEntityRepository;
import com.plm.service.common.domain.EntityNotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildServiceImplTest {

    private static final int TEST_CHILD_ID1 = 123;
    private static final int TEST_CHILD_ID2 = 234;
    private static final int TEST_CHILD_ID3 = 345;

    private ChildServiceImpl testedService;

    @Mock
    private ChildEntityRepository childEntityRepository;
    @Mock
    private ChildEntity childEntityMock1;
    @Mock
    private ChildEntity childEntityMock2;
    @Mock
    private ChildEntity childEntityMock3;

    @Before
    public void setup() {

        initMocks(this);

        testedService = new ChildServiceImpl(childEntityRepository);

        when(childEntityRepository.findOne(TEST_CHILD_ID1)).thenReturn(childEntityMock1);

        initChildEntityMock(childEntityMock1, TEST_CHILD_ID1);
        initChildEntityMock(childEntityMock2, TEST_CHILD_ID2);
        initChildEntityMock(childEntityMock3, TEST_CHILD_ID3);
    }

    @Test
    public void shouldGetChildById() {

        Child foundChild = testedService.getChildById(TEST_CHILD_ID1);

        assertEquals(TEST_CHILD_ID1, foundChild.getId());
    }

    @Test(expected = EntityNotFoundException.class)
    public void shouldThrowEntityNotFoundExceptionIfChildWasNotFound() throws Exception {

        when(childEntityRepository.findOne(TEST_CHILD_ID1)).thenReturn(null);

        testedService.getChildById(TEST_CHILD_ID1);
    }

    @Test
    public void shouldReturnAnEmptySetIfNoChild() throws Exception {

        when(childEntityRepository.findAll()).thenReturn(Arrays.asList());

        Set<Child> allChildren = testedService.getAllChildren();

        assertNotNull(allChildren);
        assertTrue(allChildren.isEmpty());
    }

    @Test
    public void shouldReturnTheSetOfAllChildren() throws Exception {

        when(childEntityRepository.findAll()).thenReturn(
                Arrays.asList(childEntityMock1, childEntityMock2, childEntityMock3));

        Set<Child> allChildren = testedService.getAllChildren();

        assertEquals(3, allChildren.size());
        assertTrue(allChildren.contains(new Child(childEntityMock1)));
        assertTrue(allChildren.contains(new Child(childEntityMock2)));
        assertTrue(allChildren.contains(new Child(childEntityMock3)));
    }

    private void initChildEntityMock(ChildEntity childEntityMock, int id) {

        when(childEntityMock.getId()).thenReturn(id);
        when(childEntityMock.getDateOfBirth()).thenReturn(LocalDate.now());
    }
}