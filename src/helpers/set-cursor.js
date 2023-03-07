export const turnElemsCursorInto = (cursor) => {
  const elems = document.querySelectorAll(
    "input, label, img, #main, .task-settings, button, select, textarea, .task-settings > *"
  );
  if (cursor !== "reset") {
    Array.from(elems).forEach((elem) => {
      elem.style.setProperty("cursor", cursor, "important");
    });
  }

  if (cursor === "reset") {
    Array.from(elems).forEach((elem) => {
      elem.style.removeProperty("cursor");
    });
  }
};
