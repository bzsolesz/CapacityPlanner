package com.plm.service.child.domain;

import com.plm.service.child.dao.WeeklyAttendanceEntity;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.time.LocalTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class WeeklyAttendanceTest {
    private static final int ID = 123;
    private static final LocalTime MONDAY_FROM = LocalTime.of(8, 0);
    private static final LocalTime MONDAY_TO = LocalTime.of(17, 0);
    private static final LocalTime TUESDAY_FROM = LocalTime.of(8, 30);
    private static final LocalTime TUESDAY_TO = LocalTime.of(17, 30);
    private static final LocalTime WEDNESDAY_FROM = LocalTime.of(9, 0);
    private static final LocalTime WEDNESDAY_TO = LocalTime.of(18, 0);
    private static final LocalTime THURSDAY_FROM = LocalTime.of(9, 30);
    private static final LocalTime THURSDAY_TO = LocalTime.of(18, 30);
    private static final LocalTime FRIDAY_FROM = LocalTime.of(10, 0);
    private static final LocalTime FRIDAY_TO = LocalTime.of(19, 0);

    private WeeklyAttendance testedAttendance;

    @Mock
    private WeeklyAttendanceEntity entityMock;

    @Before
    public void setUp() {
        initMocks(this);
    }

    @Test
    public void shouldHaveDailyAttendanceForEachWeekday() {
        testedAttendance = buildPopulatedWeeklyAttendance();

        expectPopulatedWeeklyAttendance(testedAttendance);
    }

    @Test
    public void shouldHaveAllDailyAttendancesAsOptional() {
        testedAttendance = new WeeklyAttendance.Builder(ID).build();

        expectNoWeeklyAttendance(testedAttendance);
    }

    @Test
    public void couldBeCreatedFromEntity() {
        when(entityMock.getId()).thenReturn(ID);
        when(entityMock.getMondayFrom()).thenReturn(MONDAY_FROM);
        when(entityMock.getMondayTo()).thenReturn(MONDAY_TO);
        when(entityMock.getTuesdayFrom()).thenReturn(TUESDAY_FROM);
        when(entityMock.getTuesdayTo()).thenReturn(TUESDAY_TO);
        when(entityMock.getWednesdayFrom()).thenReturn(WEDNESDAY_FROM);
        when(entityMock.getWednesdayTo()).thenReturn(WEDNESDAY_TO);
        when(entityMock.getThursdayFrom()).thenReturn(THURSDAY_FROM);
        when(entityMock.getThursdayTo()).thenReturn(THURSDAY_TO);
        when(entityMock.getFridayFrom()).thenReturn(FRIDAY_FROM);
        when(entityMock.getFridayTo()).thenReturn(FRIDAY_TO);

        testedAttendance = new WeeklyAttendance(entityMock);

        expectPopulatedWeeklyAttendance(testedAttendance);
    }

    @Test
    public void shouldBeCreatedWithNullDailyAttendanceIfValueOnEntityIsNotSet() {
        when(entityMock.getId()).thenReturn(ID);
        when(entityMock.getMondayTo()).thenReturn(MONDAY_TO);
        when(entityMock.getTuesdayFrom()).thenReturn(THURSDAY_FROM);

        testedAttendance = new WeeklyAttendance(entityMock);

        expectNoWeeklyAttendance(testedAttendance);
    }

    @Test
    public void couldBeTransformedToEntity() {
        testedAttendance = buildPopulatedWeeklyAttendance();

        WeeklyAttendanceEntity entity = testedAttendance.asEntity();

        assertEquals(ID, entity.getId());
        assertEquals(MONDAY_FROM, entity.getMondayFrom());
        assertEquals(MONDAY_TO, entity.getMondayTo());
        assertEquals(TUESDAY_FROM, entity.getTuesdayFrom());
        assertEquals(TUESDAY_TO, entity.getTuesdayTo());
        assertEquals(WEDNESDAY_FROM, entity.getWednesdayFrom());
        assertEquals(WEDNESDAY_TO, entity.getWednesdayTo());
        assertEquals(THURSDAY_FROM, entity.getThursdayFrom());
        assertEquals(THURSDAY_TO, entity.getThursdayTo());
        assertEquals(FRIDAY_FROM, entity.getFridayFrom());
        assertEquals(FRIDAY_TO, entity.getFridayTo());
    }

    @Test
    public void shouldSetNullOnEntityIfNoDailyAttendance() {
        testedAttendance = new WeeklyAttendance.Builder(ID).build();

        WeeklyAttendanceEntity entity = testedAttendance.asEntity();

        assertEquals(ID, entity.getId());
        assertNull(entity.getMondayFrom());
        assertNull(entity.getMondayTo());
        assertNull(entity.getTuesdayFrom());
        assertNull(entity.getTuesdayTo());
        assertNull(entity.getWednesdayFrom());
        assertNull(entity.getWednesdayTo());
        assertNull(entity.getThursdayFrom());
        assertNull(entity.getThursdayTo());
        assertNull(entity.getFridayFrom());
        assertNull(entity.getFridayTo());
    }

    private WeeklyAttendance buildPopulatedWeeklyAttendance() {
        DailyAttendance mondayAttendance = new DailyAttendance(MONDAY_FROM, MONDAY_TO);
        DailyAttendance tuesdayAttendance = new DailyAttendance(TUESDAY_FROM, TUESDAY_TO);
        DailyAttendance wednesdayAttendance = new DailyAttendance(WEDNESDAY_FROM, WEDNESDAY_TO);
        DailyAttendance thursdayAttendance = new DailyAttendance(THURSDAY_FROM, THURSDAY_TO);
        DailyAttendance fridayAttendance = new DailyAttendance(FRIDAY_FROM, FRIDAY_TO);

        return new WeeklyAttendance.Builder(ID)
                .monday(mondayAttendance)
                .tuesday(tuesdayAttendance)
                .wednesday(wednesdayAttendance)
                .thursday(thursdayAttendance)
                .friday(fridayAttendance)
                .build();
    }

    private void expectPopulatedWeeklyAttendance(WeeklyAttendance weeklyAttendance) {
        assertEquals(ID, weeklyAttendance.getId());
        expectPopulatedDailyAttendance(weeklyAttendance.getMonday(), MONDAY_FROM, MONDAY_TO);
        expectPopulatedDailyAttendance(weeklyAttendance.getTuesday(), TUESDAY_FROM, TUESDAY_TO);
        expectPopulatedDailyAttendance(weeklyAttendance.getWednesday(), WEDNESDAY_FROM, WEDNESDAY_TO);
        expectPopulatedDailyAttendance(weeklyAttendance.getThursday(), THURSDAY_FROM, THURSDAY_TO);
        expectPopulatedDailyAttendance(weeklyAttendance.getFriday(), FRIDAY_FROM, FRIDAY_TO);
    }

    private void expectPopulatedDailyAttendance(DailyAttendance dailyAttendance, LocalTime from, LocalTime to) {
        assertEquals(from, dailyAttendance.getFrom());
        assertEquals(to, dailyAttendance.getTo());
    }

    private void expectNoWeeklyAttendance(WeeklyAttendance weeklyAttendance) {
        assertEquals(ID, weeklyAttendance.getId());
        assertNull(weeklyAttendance.getMonday());
        assertNull(weeklyAttendance.getTuesday());
        assertNull(weeklyAttendance.getWednesday());
        assertNull(weeklyAttendance.getThursday());
        assertNull(weeklyAttendance.getFriday());
    }
}
