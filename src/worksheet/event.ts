import resize from "./aspects/resize";
import edit from "./aspects/edit";

// HANDLERS //
const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
  resize.handleMouseDown(e);
};
const handleMouseUp = (e: MouseEvent<HTMLElement>) => {
  resize.handleMouseUp(e);
};
const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
  resize.handleMouseMove(e);
};
const handleDbClick = (e: MouseEvent<HTMLElement>) => {
  edit.handleDbClick(e);
};
// HANDLERS //

function setListeners(element: HTMLDivElement) {
  element.addEventListener("mousedown", handleMouseDown);
  element.addEventListener("mouseup", handleMouseUp);
  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("dblclick", handleDbClick);
}
function removeListeners(element: HTMLDivElement) {
  element.removeEventListener("mousedown", handleMouseDown);
  element.removeEventListener("mouseup", handleMouseUp);
  element.removeEventListener("mousemove", handleMouseMove);
  element.removeEventListener("dblclick", handleDbClick);
}

export { setListeners, removeListeners };
