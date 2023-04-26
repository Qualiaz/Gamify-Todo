export const formatYipCalendarId = (id) => {
  const monthDay = id.replace("yipCalendar", "");
  const month = monthDay.replace(/[0-9]/g, "");
  const day = monthDay.replace(/\D/g, "");
  const formattedMonth =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
  return `${formattedMonth}${day}`;
};
