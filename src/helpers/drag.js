import dragula from "dragula";
import { Swappable } from "@shopify/draggable";

export function swapElems(container, handlerClassName) {
  dragula([container], {
    moves: function (el, container, handle) {
      return handle.classList.contains(handlerClassName);
    },
    direction: "vertical",
  });
}
// drake.on("drag", (el, source) => {
//   console.log(el);
//   console.log(source);
//   el.classList.add("dragging");
// });
// drake.on("dragend", (el) => {
//   el.classList.remove("dragging");
// });
