export function formatStartDate(startDate) {
  const date = startDate.split("/");
  const y = Number(date[0]);
  let m = (() => {
    if (date[1].charAt(0) === "0") {
      return Number(date[1].slice(1));
    } else return Number(date[1]);
  })();
  const d = Number(date[2]);
  return [y, m - 1, d];
}
