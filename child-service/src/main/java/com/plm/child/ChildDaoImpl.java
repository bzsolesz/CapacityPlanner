package com.plm.child;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

@Component
public class ChildDaoImpl implements ChildDao {

    static final String CHILD_ID_PARAMETER = "id";
    static final String GET_CHILD_BY_ID_QUERY = "select * from child where id = :" + CHILD_ID_PARAMETER;

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public ChildDaoImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Child getChildById(int id) {

        Map<String, Integer> parameterMap = Collections.singletonMap(CHILD_ID_PARAMETER, id);

        return jdbcTemplate.queryForObject(GET_CHILD_BY_ID_QUERY, parameterMap, createChildBeanPropertyRowMapper());
    }

    BeanPropertyRowMapper<Child> createChildBeanPropertyRowMapper() {
        return new BeanPropertyRowMapper<Child>(Child.class);
    }
}
