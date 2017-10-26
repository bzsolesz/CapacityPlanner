package com.plm.child;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import java.util.Collections;
import java.util.Map;

import static com.plm.child.ChildDaoImpl.CHILD_ID_PARAMETER;
import static com.plm.child.ChildDaoImpl.GET_CHILD_BY_ID_QUERY;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class ChildDaoImplTest {

    private static final int TEST_CHILD_ID = 123;

    private ChildDaoImpl testedDao;

    @Mock
    private NamedParameterJdbcTemplate jdbcTemplateMock;
    @Mock
    private BeanPropertyRowMapper<Child> childBeanPropertyRowMapperMock;

    @Before
    public void setup() throws Exception {

        initMocks(this);

        testedDao = spy(new ChildDaoImpl(jdbcTemplateMock));

        doReturn(childBeanPropertyRowMapperMock).when(testedDao).createChildBeanPropertyRowMapper();
    }

    @Test
    public void shouldReturnTheQueriedChild() {

        Child childMock = mock(Child.class);

        Map<String, Integer> parameterMap = Collections.singletonMap(CHILD_ID_PARAMETER, TEST_CHILD_ID);

        when(jdbcTemplateMock.queryForObject(GET_CHILD_BY_ID_QUERY, parameterMap, childBeanPropertyRowMapperMock))
                .thenReturn(childMock);

        Child queriedChild = testedDao.getChildById(TEST_CHILD_ID);

        assertEquals(childMock, queriedChild);
    }

    @Test
    public void shouldCreateChildBeanPropertyRowMapper() {

        ChildDaoImpl testedDao = new ChildDaoImpl(jdbcTemplateMock);

        BeanPropertyRowMapper<Child> rowMapper = testedDao.createChildBeanPropertyRowMapper();

        assertNotNull(rowMapper);
        assertEquals(Child.class, rowMapper.getMappedClass());
    }
}
