import {
  startOfToday,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  subMonths,
} from "date-fns";

function getDateRange(filter) {
  const today = startOfToday();

  switch (filter) {
    case "today":
      return { startDate: today, endDate: today };

    case "thisWeek":
      return {
        startDate: startOfWeek(today, { weekStartsOn: 0 }),
        endDate: endOfWeek(today, { weekStartsOn: 0 }),
      };

    case "lastWeek":
      const lastWeekStart = startOfWeek(subWeeks(today, 1), {
        weekStartsOn: 0,
      });
      const lastWeekEnd = endOfWeek(subWeeks(today, 1), { weekStartsOn: 0 });
      return { startDate: lastWeekStart, endDate: lastWeekEnd };

    case "thisMonth":
      return {
        startDate: startOfMonth(today),
        endDate: endOfMonth(today),
      };

    case "lastMonth":
      const lastMonth = subMonths(today, 1);
      return {
        startDate: startOfMonth(lastMonth),
        endDate: endOfMonth(lastMonth),
      };

    default:
      return { startDate: null, endDate: null };
  }
}

export default getDateRange;
