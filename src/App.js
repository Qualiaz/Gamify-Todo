import Controller from "./Controller/Controller";

class App {
  async init() {
    await new Controller().init();
  }
}

export default new App();
