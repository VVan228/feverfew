import resize from "./aspects/resize";

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
// HANDLERS //

function setListeners(element: HTMLDivElement) {
  element.addEventListener("mousedown", handleMouseDown);
  element.addEventListener("mouseup", handleMouseUp);
  element.addEventListener("mousemove", handleMouseMove);
}
function removeListeners(element: HTMLDivElement) {
  element.removeEventListener("mousedown", handleMouseDown);
  element.removeEventListener("mouseup", handleMouseUp);
  element.removeEventListener("mousemove", handleMouseMove);
}

export { setListeners, removeListeners };
