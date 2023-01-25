export function removeDuplicateTasks(arr) {
  const uniqueIds = [];
  const uniqueCards = [];
  arr.filter((task) => {
    const isDuplicate = uniqueIds.includes(task.taskCardModel.id);

    if (!isDuplicate) {
      uniqueIds.push(task.taskCardModel.id);
      uniqueCards.push(task);
    }
  });
  return uniqueCards;
}
