package com.plm.child;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChildServiceImpl implements ChildService {

    private ChildDao childDao;

    @Autowired
    public ChildServiceImpl(ChildDao childDao) {
        this.childDao = childDao;
    }

    @Override
    public Child getChildById(int id) throws ResourceNotFoundException {
        return childDao.getChildById(id);
    }
}
