export default class OrderTask {
  constructor(tasksArr) {
    this.tasksArr = tasksArr;
  }

  difficulty(direction) {
    console.log(this.tasksArr);
    const orderedTasks = [];
    const diffValues = this.tasksArr.map((task) => {
      const diff = task.taskCardModel.difficulty;
      const id = task.taskCardModel.id;
      if (diff === "trivial") return { taskId: id, difficulty: diff, v: 1 };
      if (diff === "easy") return { taskId: id, difficulty: diff, v: 2 };
      if (diff === "medium") return { taskId: id, difficulty: diff, v: 3 };
      if (diff === "hard") return { taskId: id, difficulty: diff, v: 4 };
      if (diff === "challenge") return { taskId: id, difficulty: diff, v: 5 };
    });

    const orderedDiffValue = diffValues.sort((prev, next) => {
      if (direction === "ascending") {
        if (prev.v > next.v) return 1;
        if (prev.v < next.v) return -1;
        return 0;
      }
      if (direction === "descending") {
        if (prev.v > next.v) return -1;
        if (prev.v < next.v) return 1;
        return 0;
      }
    });

    orderedDiffValue.forEach((shallowTask) => {
      this.tasksArr.forEach((task) => {
        if (task.taskCardModel.id === shallowTask.taskId)
          orderedTasks.push(task);
      });
    });
    return orderedTasks;
  }

  energy(direction) {
    const orderedTasks = this.tasksArr.sort((a, b) => {
      const prevEnergy = Number(a.taskCardModel.energy);
      const nextEnergy = Number(b.taskCardModel.energy);
      if (direction === "ascending") {
        if (prevEnergy > nextEnergy) return 1;
        if (prevEnergy < nextEnergy) return -1;
        return 0;
      }
      if (direction === "descending") {
        if (prevEnergy > nextEnergy) return -1;
        if (prevEnergy < nextEnergy) return 1;
        return 0;
      }
    });
    return orderedTasks;
  }

  timeCreated(direction) {
    const orderedTasks = this.tasksArr.sort((prev, next) => {
      const prevCreatedTime = prev.taskCardModel.createdTime;
      const nextCreatedTime = next.taskCardModel.createdTime;
      if (direction === "ascending") {
        if (prevCreatedTime > nextCreatedTime) return 1;
        if (prevCreatedTime < nextCreatedTime) return -1;
        return 0;
      }
      if (direction === "descending") {
        if (prevCreatedTime > nextCreatedTime) return -1;
        if (prevCreatedTime < nextCreatedTime) return 1;
        return 0;
      }
    });
    return orderedTasks;
  }
}
