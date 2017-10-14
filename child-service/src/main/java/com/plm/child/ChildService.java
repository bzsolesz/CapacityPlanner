package com.plm.child;

public interface ChildService {
    Child getChildById(int id) throws ResourceNotFoundException;
}
