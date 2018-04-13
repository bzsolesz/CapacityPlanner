export function fromDateToEnGBString(date: Date): string {
  return date.toLocaleDateString("en-GB");
}

export function fromEnGbBStringToDate(dateString: string): Date {
  return new Date(dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1"));
}
