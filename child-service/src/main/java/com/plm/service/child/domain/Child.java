package com.plm.service.child.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plm.service.child.dao.ChildEntity;

import java.time.LocalDate;

public class Child {

    private int id;
    private String firstName;
    private String surname;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateOfBirth;

    public Child(int id, String firstName, String surname, LocalDate dateOfBirth) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
    }

    Child(ChildEntity childEntity) {
        this.id = childEntity.getId();
        this.firstName = childEntity.getFirstName();
        this.surname = childEntity.getSurname();
        this.dateOfBirth = childEntity.getDateOfBirth();
    }

    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSurname() {
        return surname;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
}