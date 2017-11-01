package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.ChildEntityRepository;
import com.plm.service.common.domain.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
