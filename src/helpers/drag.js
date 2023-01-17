import dragula from "dragula";

export function swapElems(container, handlerClassName) {
  dragula([container], {
    moves: function (el, container, handle) {
      return handle.classList.contains(handlerClassName);
    },
  });
}
