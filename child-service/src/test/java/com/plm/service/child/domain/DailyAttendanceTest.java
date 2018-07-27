package com.plm.service.child.domain;

import org.junit.Test;

import java.time.LocalTime;

import static org.junit.Assert.assertEquals;

public class DailyAttendanceTest {
    private DailyAttendance testedAttendance;

    @Test
    public void shouldHaveFromToTimes() {
        LocalTime from = LocalTime.of(8, 0);
        LocalTime to = LocalTime.of(17, 30);
        testedAttendance = new DailyAttendance(from, to);

        assertEquals(8, testedAttendance.getFrom().getHour());
        assertEquals(0, testedAttendance.getFrom().getMinute());
        assertEquals(17, testedAttendance.getTo().getHour());
        assertEquals(30, testedAttendance.getTo().getMinute());
    }
}
