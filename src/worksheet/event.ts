import worksheet from "./base";

// UTILITY //
// resize
function isResize(target: HTMLElement): boolean {
  return target.hasAttribute("resizing");
}
function setResize(target: HTMLElement): void {
  target.setAttribute("resizing", "true");
}
function removeResize(target: HTMLElement): void {
  target.removeAttribute("resizing");
}
// virt. coords
function isHeader(target: HTMLElement): boolean {
  return !target.hasAttribute("d-y");
}
function getX(target: HTMLElement): number | null {
  return target.getAttribute("d-x") as number | null;
}
function getY(target: HTMLElement): number | null {
  return target.getAttribute("d-y") as number | null;
}
function isMouseOnResize(mouseEvent: MouseEvent<HTMLElement>): boolean {
  const coord =
    (mouseEvent.clientX -
      mouseEvent.target.offsetLeft -
      mouseEvent.currentTarget.offsetLeft -
      mouseEvent.target.offsetWidth) *
    -1;
  //if (coord < 6) {
  //  mouseEvent.target.style.cursor = "col-resize";
  //} else if (mouseEvent.target.style.cursor === "col-resize") {
  //  mouseEvent.target.style.cursor = null;
  //}
  return coord < 6;
}
// UTILITY //

const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
  if (isHeader(e.target) && !isResize(e.target)) {
  }
  //console.log(getX(e.target));
};

const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
  if (isResize(e.target)) {
  }
  if (isHeader(e.target) && !isResize(e.target)) {
  }
};

function setListeners(element: HTMLDivElement) {
  element.addEventListener("mousedown", handleMouseDown);
  element.addEventListener("mousemove", handleMouseMove);
}
function removeListeners(element: HTMLDivElement) {
  element.removeEventListener("mousedown", handleMouseDown);
  element.removeEventListener("mousemove", handleMouseMove);
}

export { setListeners, removeListeners };
