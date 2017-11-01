package com.plm.service.child.domain;

import com.plm.service.common.domain.EntityNotFoundException;

public interface ChildService {

    /**
     * Returns the <code>Child</code> by its internal ID.
     *
     * @param id internal ID of the Child
     * @return the Child
     * @throws EntityNotFoundException if Child was not found
     */
    Child getChildById(int id);
}
