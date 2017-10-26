package com.plm.child;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Child {

    private int id;
    private String firstName;
    private String surname;

    @JsonFormat(pattern = "dd/MM/YYYY")
    private Date dateOfBirth;

    public Child() {
    }

    public int getId() { return id; }

    public String getFirstName() {
        return firstName;
    }

    public String getSurname() {
        return surname;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}
