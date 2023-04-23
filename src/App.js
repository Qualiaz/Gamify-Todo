import Controller from "./Controller/Controller";

class App {
  async init() {
    await Controller();
  }
}

export default new App();
