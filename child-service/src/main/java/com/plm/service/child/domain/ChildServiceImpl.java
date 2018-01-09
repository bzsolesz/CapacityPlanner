package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.ChildEntityRepository;
import com.plm.service.common.domain.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
class ChildServiceImpl implements ChildService {

    private ChildEntityRepository childEntityRepository;

    @Autowired
    public ChildServiceImpl(ChildEntityRepository childEntityRepository) {
        this.childEntityRepository = childEntityRepository;
    }

    @Override
    public Child getChildById(int id) {
        ChildEntity childEntity = childEntityRepository.findOne(id);

        if (childEntity != null) {
            return new Child(childEntity);
        } else {
            throw new EntityNotFoundException();
        }
    }

    @Override
    public Set<Child> getAllChildren() {

        Iterable<ChildEntity> allChildrenEntity = childEntityRepository.findAll();

        return StreamSupport.stream(allChildrenEntity.spliterator(), false)
                .map(childEntity -> new Child(childEntity))
                .collect(Collectors.toSet());
    }
}