package com.plm.children;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChildrenController {

    @Autowired
    private ChildrenService childrenService;

    @RequestMapping(value = "child", method = RequestMethod.GET)
    public String index() {
        return childrenService.index();
    }
}
