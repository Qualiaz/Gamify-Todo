import Controller from "./Controller/Controller";

class App {
  async init() {
    const model = await Controller();
    return model;
  }
}

export default new App();
