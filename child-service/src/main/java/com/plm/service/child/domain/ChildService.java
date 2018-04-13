package com.plm.service.child.domain;

import com.plm.service.common.domain.EntityNotFoundException;

import java.util.Set;

public interface ChildService {

    /**
     * Returns the <code>Child</code> by its internal ID.
     *
     * @param id internal ID of the Child
     * @return the Child
     * @throws EntityNotFoundException if Child was not found
     */
    Child getChildById(int id);

    /**
     * Returns all children (<code>Child</code>).
     *
     * @return the set of all Children
     */
    Set<Child> getAllChildren();

    /**
     * Update the <code>Child</code> in the data storage.
     *
     * @param child the child to update
     */
    void updateChild(Child child);
}
