package com.plm.service.child.dao;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ChildEntityRepository extends CrudRepository<ChildEntity, Integer> {
    Optional<ChildEntity> findOneOptionalById(Integer id);
}
