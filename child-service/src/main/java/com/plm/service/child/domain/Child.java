package com.plm.service.child.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.plm.service.child.dao.ChildEntity;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Child {
    private int id;
    private String firstName;
    private String surname;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dateOfBirth;
    private WeeklyAttendance attendance;

    public Child(int id, String firstName, String surname, LocalDate dateOfBirth, WeeklyAttendance attendance) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.attendance = attendance;
    }

    Child() {
    }

    Child(ChildEntity entity) {
        this.id = entity.getId();
        this.firstName = entity.getFirstName();
        this.surname = entity.getSurname();
        this.dateOfBirth = entity.getDateOfBirth();
        this.attendance = new WeeklyAttendance(entity.getAttendance());
    }

    ChildEntity asEntity() {
        ChildEntity entity = new ChildEntity();

        entity.setId(this.id);
        entity.setFirstName(this.firstName);
        entity.setSurname(this.surname);
        entity.setDateOfBirth(this.dateOfBirth);
        entity.setAttendance(this.attendance.asEntity());

        return entity;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) { return true; }
        if (object == null || getClass() != object.getClass()) { return false; }
        return id == ((Child) object).id;
    }

    @Override
    public int hashCode() {
        return id;
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

    public WeeklyAttendance getAttendance() {
        return attendance;
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

    public void setAttendance(WeeklyAttendance attendance) {
        this.attendance = attendance;
    }
}
