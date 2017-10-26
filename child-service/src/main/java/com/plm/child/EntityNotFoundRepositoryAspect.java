package com.plm.child;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class EntityNotFoundRepositoryAspect {

    @AfterReturning(pointcut = "execution(* com.plm.child.*Repository.findOne(..))", returning = "entity")
    public void throwEntityNotFoundExceptionIfReturningEntityIsNull(Object entity) {
        if (entity == null) {
            throw new EntityNotFoundException();
        }
    }
}
