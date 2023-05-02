export default class InitUserData {
  profile = {};
  constructor(email, displayName) {
    this.profile.email = email;
    this.profile.displayName = displayName;
  }

  stats = {
    energyPoints: 0,
    finishedTasks: 0,
    totalTimeTracked: 0,
    habitsPositive: 0,
    habitsNegative: 0,
    createdAccount: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    yearInPixels: {
      amazing: 0,
      good: 0,
      ok: 0,
      bad: 0,
      awful: 0,
    },
  };
}
