// used for safety
export function removeDuplicateTasks(arr) {
  const uniqueIds = [];
  const uniqueCards = [];
  arr.filter((task) => {
    const isDuplicate = uniqueIds.includes(task.model.cardState.id);

    if (!isDuplicate) {
      uniqueIds.push(task.model.cardState.id);
      uniqueCards.push(task);
    }
  });
  return uniqueCards;
}
