package com.plm.service.child.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ChildEntityRepository extends CrudRepository<ChildEntity, Integer> {

    @Transactional(readOnly = true)
    Optional<ChildEntity> findOneOptionalById(Integer id);
}
