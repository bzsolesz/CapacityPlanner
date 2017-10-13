package com.plm.child;

import java.util.Date;

public class Child {
    private String firstName;
    private String surname;
    private Date dateOfBirth;

    public Child(String firstName, String surname, Date dateOfBirth) {
        this.firstName = firstName;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSurname() {
        return surname;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }
}
