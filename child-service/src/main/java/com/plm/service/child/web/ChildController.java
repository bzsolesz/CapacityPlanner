package com.plm.service.child.web;

import com.plm.service.child.domain.Child;
import com.plm.service.child.domain.ChildService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/child")
public class ChildController {

    private ChildService childService;

    @Autowired
    public ChildController(ChildService childService) {
        this.childService = childService;
    }

    @ApiResponses(value = {
            @ApiResponse(code = 404, message = "Child was not found")
    })
    @GetMapping(value = "/{id}", produces = "application/json")
    public Child getChildById(@PathVariable int id) {
        return childService.getChildById(id);
    }

    @GetMapping(value = "/all", produces = "application/json")
    public Set<Child> getAllChildren() { return childService.getAllChildren(); }

    @ApiResponses(value = {
            @ApiResponse(code = 400, message = "Child id mismatch!")
    })
    @PutMapping(value = "/{id}", consumes="application/json", produces = "application/json")
    public ResponseEntity<Void> updateChild(@PathVariable int id, @RequestBody Child child) {

        if (id != child.getId()) {
            return ResponseEntity.badRequest().build();
        }

        childService.updateChild(child);

        return ResponseEntity.noContent().build();
    }
}
