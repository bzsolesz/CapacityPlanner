import { fromDateToEnGBString, fromEnGbBStringToDate } from "./date-utility";

describe("Date Utility", () => {
  it("should transform a Date to an EN-GB string (like: 31/12/2018)", () => {
    const testDate: Date = new Date(2018, 11, 31);
    expect(fromDateToEnGBString(testDate)).toBe("31/12/2018");
  });

  it("should transform a EN-GB string (like: 31/12/2018) into a Date", () => {
    const resultDate: Date = fromEnGbBStringToDate("31/12/2018");
    expect(resultDate.getFullYear()).toBe(2018);
    expect(resultDate.getMonth()).toBe(11);
    expect(resultDate.getDate()).toBe(31);
  });
});
