package com.plm.service.child.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalTime;

public class DailyAttendance {
    @JsonFormat(pattern = "HH:mm")
    private LocalTime from;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime to;

    @JsonCreator
    public DailyAttendance(
            @JsonProperty("from") LocalTime from,
            @JsonProperty("to") LocalTime to) {
        this.from = from;
        this.to = to;
    }

    public LocalTime getFrom() {
        return from;
    }

    public LocalTime getTo() {
        return to;
    }
}
