export function formatHebrewDate(date: Date): string {
  return date.toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
}

export function parseHebrewDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
}

export function getMonthsBetweenDates(startDate: Date, endDate: Date): number {
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
         (endDate.getMonth() - startDate.getMonth());
}