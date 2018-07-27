package com.plm.service.child.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.plm.service.child.dao.WeeklyAttendanceEntity;

import java.time.LocalTime;

@JsonInclude(Include.NON_NULL)
public class WeeklyAttendance {
    private int id;
    private DailyAttendance monday;
    private DailyAttendance tuesday;
    private DailyAttendance wednesday;
    private DailyAttendance thursday;
    private DailyAttendance friday;

    @JsonCreator
    WeeklyAttendance(@JsonProperty("id") int id,
                     @JsonProperty("monday") DailyAttendance monday,
                     @JsonProperty("tuesday") DailyAttendance tuesday,
                     @JsonProperty("wednesday") DailyAttendance wednesday,
                     @JsonProperty("thursday") DailyAttendance thursday,
                     @JsonProperty("friday") DailyAttendance friday) {
        this.id = id;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
    }

    WeeklyAttendance(WeeklyAttendanceEntity entity) {
        this.id = entity.getId();
        this.monday = buildDailyAttendanceIfSet(entity.getMondayFrom(), entity.getMondayTo());
        this.tuesday = buildDailyAttendanceIfSet(entity.getTuesdayFrom(), entity.getTuesdayTo());
        this.wednesday = buildDailyAttendanceIfSet(entity.getWednesdayFrom(), entity.getWednesdayTo());
        this.thursday = buildDailyAttendanceIfSet(entity.getThursdayFrom(), entity.getThursdayTo());
        this.friday = buildDailyAttendanceIfSet(entity.getFridayFrom(), entity.getFridayTo());
    }

    private DailyAttendance buildDailyAttendanceIfSet(LocalTime from, LocalTime to) {
        return (from != null && to != null) ? new DailyAttendance(from, to) : null;
    }

    WeeklyAttendanceEntity asEntity() {
        WeeklyAttendanceEntity entity = new WeeklyAttendanceEntity();
        entity.setId(this.getId());

        if (monday != null) {
            entity.setMondayFrom(monday.getFrom());
            entity.setMondayTo(monday.getTo());
        }
        if (tuesday != null) {
            entity.setTuesdayFrom(tuesday.getFrom());
            entity.setTuesdayTo(tuesday.getTo());
        }
        if (wednesday != null) {
            entity.setWednesdayFrom(wednesday.getFrom());
            entity.setWednesdayTo(wednesday.getTo());
        }
        if (thursday != null) {
            entity.setThursdayFrom(thursday.getFrom());
            entity.setThursdayTo(thursday.getTo());
        }
        if (friday != null) {
            entity.setFridayFrom(friday.getFrom());
            entity.setFridayTo(friday.getTo());
        }

        return entity;
    }

    public int getId() {
        return id;
    }

    public DailyAttendance getMonday() {
        return monday;
    }

    public DailyAttendance getTuesday() {
        return tuesday;
    }

    public DailyAttendance getWednesday() {
        return wednesday;
    }

    public DailyAttendance getThursday() {
        return thursday;
    }

    public DailyAttendance getFriday() {
        return friday;
    }

    public static class Builder {
        private int id;
        private DailyAttendance monday;
        private DailyAttendance tuesday;
        private DailyAttendance wednesday;
        private DailyAttendance thursday;
        private DailyAttendance friday;

        public Builder(int id) {
            this.id = id;
        }

        public Builder monday(DailyAttendance attendance) {
            this.monday = attendance;
            return this;
        }

        public Builder tuesday(DailyAttendance attendance) {
            tuesday = attendance;
            return this;
        }

        public Builder wednesday(DailyAttendance attendance) {
            wednesday = attendance;
            return this;
        }

        public Builder thursday(DailyAttendance attendance) {
            thursday = attendance;
            return this;
        }

        public Builder friday(DailyAttendance attendance) {
            friday = attendance;
            return this;
        }

        public WeeklyAttendance build() {
            return new WeeklyAttendance(id, monday, tuesday, wednesday, thursday, friday);
        }
    }
}
