package com.plm.children;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChildrenController {

    @RequestMapping(value = "child", method = RequestMethod.GET)
    public String index() {
        return "This is the children controller!";
    }
}
