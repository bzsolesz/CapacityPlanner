package com.plm.service.child.dao;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException {

    static final String MESSAGE = "Requested entity was not found!";

    public EntityNotFoundException() {
        super(MESSAGE);
    }
}
