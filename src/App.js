import Controller from "./Controller/Controller";

class App {
  constructor() {}

  async init() {
    // init controller
    await Controller();
    // init view
  }
}

export default new App();
