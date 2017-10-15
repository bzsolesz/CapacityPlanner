package com.plm.child;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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

    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Child was not found"),
            @ApiResponse(code = 500, message = "An error has occurred and the lookup has failed")
    })

    @GetMapping(value = "/{id}", produces = "application/json")
    public Child getChildById(@PathVariable int id) {
        return childService.getChildById(id);
    }
}
