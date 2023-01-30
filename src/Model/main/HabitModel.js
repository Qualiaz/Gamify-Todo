export default class HabitModel {
  static allHabits = [];

  checked = false;
  streak = {
    positive: 0,
    negative: 0,
  };

  constructor({ name, difficulty, energy, notes, id }) {
    this.name = name;
    this.difficulty = difficulty;
    this.energy = Number(energy);
    this.notes = notes;
    this.id = id;
    HabitModel.allHabits.push(this);
  }
}
