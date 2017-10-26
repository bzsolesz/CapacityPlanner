package com.plm.service.child.domain.impl;

import com.plm.service.child.dao.ChildEntityRepository;
import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.domain.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChildServiceImpl implements ChildService {

    private ChildEntityRepository childEntityRepository;

    @Autowired
    public ChildServiceImpl(ChildEntityRepository childEntityRepository) {
        this.childEntityRepository = childEntityRepository;
    }

    @Override
    public ChildEntity getChildById(int id) {
        return childEntityRepository.findOne(id);
    }
}
