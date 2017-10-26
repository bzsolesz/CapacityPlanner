package com.plm.child;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Child {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstName;
    private String surname;

    @JsonFormat(pattern = "dd/MM/YYYY")
    private Date dateOfBirth;

    protected Child() {
    }

    public Child(int id, String firstName, String surname, Date dateOfBirth) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
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
