export function formatStartDate(startDate) {
  let date;
  if (startDate.includes("/")) date = startDate.split("/");
  if (startDate.includes("-")) date = startDate.split("-");

  const y = Number(date[0]);
  let m = (() => {
    if (date[1].charAt(0) === "0") {
      return Number(date[1].slice(1));
    } else return Number(date[1]);
  })();
  const d = Number(date[2]);
  return [y, m - 1, d];
}

export function getCurrentDay() {
  // format ex "4 July"
  let date = new Date();
  let day = date.getDate();
  let month = date.toLocaleString("default", { month: "long" });
  return `${month}${day}`;
}
