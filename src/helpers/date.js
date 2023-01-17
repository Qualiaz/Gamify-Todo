import intervalToDuration from "date-fns/intervalToDuration";

export function getCurDate() {
  const date = new Date();
  const curDate = `${date.getDate()} ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;
  console.log(curDate);
}

export function getUserCreationDate(userCreationTime) {
  userCreationTime.split(" ");
}
intervalToDuration();
console.log(
  intervalToDuration({
    start: new Date(),
    end: new Date(creationTime),
  })
);
