package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntityRepository;
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
        return new Child(childEntityRepository.findOne(id));
    }
}
