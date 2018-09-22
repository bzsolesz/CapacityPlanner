package com.plm.service.child.dao;

import org.junit.Test;

import java.time.LocalTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class WeeklyAttendanceEntityTest {
    private static final int ID = 123;
    private static final LocalTime MONDAY_FROM = LocalTime.of(8, 30);
    private static final LocalTime MONDAY_TO = LocalTime.of(18, 30);
    private static final LocalTime TUESDAY_FROM = LocalTime.of(9, 0);
    private static final LocalTime TUESDAY_TO = LocalTime.of(18, 0);
    private static final LocalTime WEDNESDAY_FROM = LocalTime.of(9, 30);
    private static final LocalTime WEDNESDAY_TO = LocalTime.of(17, 30);
    private static final LocalTime THURSDAY_FROM = LocalTime.of(10, 00);
    private static final LocalTime THURSDAY_TO = LocalTime.of(17, 00);
    private static final LocalTime FRIDAY_FROM = LocalTime.of(10, 30);
    private static final LocalTime FRIDAY_TO = LocalTime.of(16, 30);

    private WeeklyAttendanceEntity testedEntity;

    @Test
    public void shouldHaveStandardGettersAndSetters() {
        testedEntity = new WeeklyAttendanceEntity();
        testedEntity.setId(ID);
        testedEntity.setMondayFrom(MONDAY_FROM);
        testedEntity.setMondayTo(MONDAY_TO);
        testedEntity.setTuesdayFrom(TUESDAY_FROM);
        testedEntity.setTuesdayTo(TUESDAY_TO);
        testedEntity.setWednesdayFrom(WEDNESDAY_FROM);
        testedEntity.setWednesdayTo(WEDNESDAY_TO);
        testedEntity.setThursdayFrom(THURSDAY_FROM);
        testedEntity.setThursdayTo(THURSDAY_TO);
        testedEntity.setFridayFrom(FRIDAY_FROM);
        testedEntity.setFridayTo(FRIDAY_TO);

        assertNotNull(testedEntity);
        assertEquals(MONDAY_FROM, testedEntity.getMondayFrom());
        assertEquals(MONDAY_TO, testedEntity.getMondayTo());
        assertEquals(TUESDAY_FROM, testedEntity.getTuesdayFrom());
        assertEquals(TUESDAY_TO, testedEntity.getTuesdayTo());
        assertEquals(WEDNESDAY_FROM, testedEntity.getWednesdayFrom());
        assertEquals(WEDNESDAY_TO, testedEntity.getWednesdayTo());
        assertEquals(THURSDAY_FROM, testedEntity.getThursdayFrom());
        assertEquals(THURSDAY_TO, testedEntity.getThursdayTo());
        assertEquals(FRIDAY_FROM, testedEntity.getFridayFrom());
        assertEquals(FRIDAY_TO, testedEntity.getFridayTo());
    }
}
