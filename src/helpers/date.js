export function formatStartDate(startDate) {
  let date;
  if (startDate.includes("/")) date = startDate.split("/");
  if (startDate.includes("-")) date = startDate.split("-");
  // console.log(startDate.includes("="));

  const y = Number(date[0]);
  let m = (() => {
    if (date[1].charAt(0) === "0") {
      return Number(date[1].slice(1));
    } else return Number(date[1]);
  })();
  const d = Number(date[2]);
  return [y, m - 1, d];
}
