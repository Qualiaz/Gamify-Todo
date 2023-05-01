import { eachDayOfInterval, format, isAfter, isToday } from "date-fns";
import { isThisWeek, isTomorrow } from "date-fns/esm";
//prettier-ignore
import {curTasksThisWeek,curTasksToday,curTasksTomorrow} from "../Model/main/TaskModel";
import { formatStartDate } from "./date";

export function addTasksNoRepeatFilter(task) {
  const startDateSimple = formatStartDate(task.model.cardState.startDate);
  const [y, m, d] = startDateSimple;
  const startDate = new Date(y, m, d);
  if (isToday(startDate)) curTasksToday.push(task);
  if (isTomorrow(startDate)) curTasksTomorrow.push(task);
  if (isThisWeek(startDate)) curTasksThisWeek.push(task);
}

export function addTasksOtherDayFilter(otherDay, task) {
  const daysArr = everyOtherDay(otherDay, task);
  daysArr.forEach((day) => {
    const formatFullDate = format(new Date(day), "yyyy/MM/dd");
    const [y, m, d] = formatStartDate(formatFullDate);
    const startDate = new Date(y, m, d);
    if (isTomorrow(startDate)) curTasksTomorrow.push(task);
    if (isToday(startDate)) curTasksToday.push(task);
    if (isThisWeek(startDate)) curTasksThisWeek.push(task);
  });
}

export function addTasksWeekDaysFilter(weekDays, task) {
  const startDateSimple = formatStartDate(task.model.cardState.startDate);
  const [y, m, d] = startDateSimple;
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const startDate = new Date(y, m, d);

  const todayName = format(today, "EEE");
  const tomorrowName = format(tomorrow, "EEE");

  for (const day in weekDays) {
    if (weekDays[day] === "true" && day === todayName) {
      if (isAfter(today, startDate)) curTasksToday.push(task);
    }
    if (weekDays[day] === "true" && day === tomorrowName) {
      if (isAfter(tomorrow, startDate)) curTasksTomorrow.push(task);
    }
  }

  if (isThisWeek(startDate)) curTasksThisWeek.push(task);
}

function everyOtherDay(otherDay, task) {
  const startDateArr = formatStartDate(task.model.cardState.startDate);
  const [y, m, d] = startDateArr;
  let result = [];
  const eachDay = eachDayOfInterval({
    start: new Date(y, m, d),
    end: new Date(2025, 5, 23),
  });
  for (let i = 0; i < eachDay.length; i += otherDay) {
    result.push(eachDay[i]);
  }
  console.log(result);
  return result;
}
