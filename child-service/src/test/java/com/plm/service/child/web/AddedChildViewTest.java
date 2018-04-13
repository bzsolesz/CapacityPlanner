package com.plm.service.child.web;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class AddedChildViewTest {

    public static final int TEST_ADDED_CHILD_ID = 1;

    @Test
    public void shouldSetItsFieldsByConstructor() {
        AddedChildView addedChildView = new AddedChildView(TEST_ADDED_CHILD_ID);

        assertEquals(TEST_ADDED_CHILD_ID, addedChildView.getId());
    }

    @Test
    public void shouldSetItsFieldsBySetter() {
        AddedChildView addedChildView = new AddedChildView();
        addedChildView.setId(TEST_ADDED_CHILD_ID);

        assertEquals(TEST_ADDED_CHILD_ID, addedChildView.getId());
    }
}