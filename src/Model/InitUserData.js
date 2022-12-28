export default class InitUserData {
  profile = {};
  constructor(email, displayName) {
    this.profile.email = email;
    this.profile.displayName = displayName;
    // this.profile.photoURL = photoURL;
  }
  stats = {
    energyPoints: 0,
    finishedTasks: 0,
    totalTimeTracked: 0,
    habitsPositive: 0,
    habitsNegative: 0,
    createdAccount: 0,
    yearInPixels: {
      amazing: 0,
      good: 0,
      ok: 0,
      sad: 0,
      awful: 0,
    },
  };

  tasks = {};

  projects = {};

  habits = {};
}
