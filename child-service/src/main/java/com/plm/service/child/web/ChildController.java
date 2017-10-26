package com.plm.service.child.web;

import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.domain.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/child")
public class ChildController {

    private ChildService childService;

    @Autowired
    public ChildController(ChildService childService) {
        this.childService = childService;
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ChildEntity getChildById(@PathVariable int id) {
        return childService.getChildById(id);
    }
}
