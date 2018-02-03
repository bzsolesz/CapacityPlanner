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

    Child() {
    }

    Child(ChildEntity childEntity) {
        this.id = childEntity.getId();
        this.firstName = childEntity.getFirstName();
        this.surname = childEntity.getSurname();
        this.dateOfBirth = childEntity.getDateOfBirth();
    }

    ChildEntity asChildEntity() {

        ChildEntity childEntity = new ChildEntity();

        childEntity.setId(this.id);
        childEntity.setFirstName(this.firstName);
        childEntity.setSurname(this.surname);
        childEntity.setDateOfBirth(this.dateOfBirth);

        return childEntity;
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

    @Override
    public boolean equals(Object object) {

        if (this == object) return true;

        if (object == null || getClass() != object.getClass()) return false;

        return id == ((Child) object).id;
    }

    @Override
    public int hashCode() {
        return id;
    }

    void setId(int id) {
        this.id = id;
    }

    void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    void setSurname(String surname) {
        this.surname = surname;
    }

    void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}