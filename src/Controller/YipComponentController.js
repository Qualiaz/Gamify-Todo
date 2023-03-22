import YipComponentView from "../View/main/yip/YipComponentView";

export default class YipComponentController {
  constructor() {
    this.view = new YipComponentView();
  }

  init(parentEl) {
    this.view.render(parentEl);
  }
}
