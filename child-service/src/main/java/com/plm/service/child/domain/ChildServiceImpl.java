package com.plm.service.child.domain;

import com.plm.service.child.dao.ChildEntity;
import com.plm.service.child.dao.ChildEntityRepository;
import com.plm.service.common.domain.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
class ChildServiceImpl implements ChildService {

    private ChildEntityRepository childEntityRepository;

    @Autowired
    ChildServiceImpl(ChildEntityRepository childEntityRepository) {
        this.childEntityRepository = childEntityRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Child getChildById(int id) {
        Optional<ChildEntity> childEntity = childEntityRepository.findOneOptionalById(id);

        if (childEntity.isPresent()) {
            return new Child(childEntity.get());
        } else {
            throw new EntityNotFoundException();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Child> getAllChildren() {
        Iterable<ChildEntity> allChildrenEntity = childEntityRepository.findAll();

        return StreamSupport.stream(allChildrenEntity.spliterator(), false)
                .map(Child::new)
                .collect(Collectors.toSet());
    }

    @Override
    @Transactional
    public void updateChild(Child child) {
        childEntityRepository.save(child.asEntity());
    }

    @Override
    @Transactional
    public int addChild(Child child) {
        ChildEntity addedChild = childEntityRepository.save(child.asEntity());
        return addedChild.getId();
    }

    @Override
    @Transactional
    public void deleteChild(int id) { childEntityRepository.delete(id); }
}