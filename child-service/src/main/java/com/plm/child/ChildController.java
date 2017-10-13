package com.plm.child;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChildController {

    @Autowired
    private ChildService childService;

    @RequestMapping(value = "child", method = RequestMethod.GET)
    public String index() {
        return childService.index();
    }
}
