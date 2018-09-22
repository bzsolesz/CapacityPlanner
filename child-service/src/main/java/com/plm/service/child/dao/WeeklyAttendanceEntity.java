package com.plm.service.child.dao;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalTime;

@Entity
@Table(name = "weekly_attendance")
public class WeeklyAttendanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalTime mondayFrom;
    private LocalTime mondayTo;
    private LocalTime tuesdayFrom;
    private LocalTime tuesdayTo;
    private LocalTime wednesdayFrom;
    private LocalTime wednesdayTo;
    private LocalTime thursdayFrom;
    private LocalTime thursdayTo;
    private LocalTime fridayFrom;
    private LocalTime fridayTo;

    public WeeklyAttendanceEntity() {
    }

    public int getId() {
        return id;
    }

    public LocalTime getMondayFrom() {
        return mondayFrom;
    }

    public LocalTime getMondayTo() {
        return mondayTo;
    }

    public LocalTime getTuesdayFrom() {
        return tuesdayFrom;
    }

    public LocalTime getTuesdayTo() {
        return tuesdayTo;
    }

    public LocalTime getWednesdayFrom() {
        return wednesdayFrom;
    }

    public LocalTime getWednesdayTo() {
        return wednesdayTo;
    }

    public LocalTime getThursdayFrom() {
        return thursdayFrom;
    }

    public LocalTime getThursdayTo() {
        return thursdayTo;
    }

    public LocalTime getFridayFrom() {
        return fridayFrom;
    }

    public LocalTime getFridayTo() {
        return fridayTo;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setMondayFrom(LocalTime mondayFrom) {
        this.mondayFrom = mondayFrom;
    }

    public void setMondayTo(LocalTime mondayTo) {
        this.mondayTo = mondayTo;
    }

    public void setTuesdayFrom(LocalTime tuesdayFrom) {
        this.tuesdayFrom = tuesdayFrom;
    }

    public void setTuesdayTo(LocalTime tuesdayTo) {
        this.tuesdayTo = tuesdayTo;
    }

    public void setWednesdayFrom(LocalTime wednesdayFrom) {
        this.wednesdayFrom = wednesdayFrom;
    }

    public void setWednesdayTo(LocalTime wednesdayTo) {
        this.wednesdayTo = wednesdayTo;
    }

    public void setThursdayFrom(LocalTime thursdayFrom) {
        this.thursdayFrom = thursdayFrom;
    }

    public void setThursdayTo(LocalTime thursdayTo) {
        this.thursdayTo = thursdayTo;
    }

    public void setFridayFrom(LocalTime fridayFrom) {
        this.fridayFrom = fridayFrom;
    }

    public void setFridayTo(LocalTime fridayTo) {
        this.fridayTo = fridayTo;
    }
}
