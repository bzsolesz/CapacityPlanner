package com.plm.child;

import org.springframework.stereotype.Service;

@Service
public class ChildService {

    public String index() {
        return "This is the child controller!";
    }
}
