package com.plm.child;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChildServiceImpl implements ChildService {

    private ChildRepository childRepository;

    @Autowired
    public ChildServiceImpl(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    @Override
    public Child getChildById(int id) {
        return childRepository.findOne(id);
    }
}
