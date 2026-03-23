import worksheet from "./base";

// UTILITY //
// resize
function isResize(): boolean {
  return worksheet.context.resizing.state;
}
function setResize(target: HTMLElement): void {
  worksheet.context.resizing.state = true;
  worksheet.context.resizing.el = target;
  //worksheet.context.resizing.el.style.backgroundColor = "black";
}
function unsetResize(): void {
  worksheet.context.resizing.state = false;
  //worksheet.context.resizing.el?.style.backgroundColor = "";
  worksheet.context.resizing.el = null;
}
function setResizeCursor(e: MouseEvent<HTMLElement>): void {
  e.currentTarget.style.cursor = "col-resize";
}
function unsetResizeCursor(e: MouseEvent<HTMLElement>): void {
  e.currentTarget.style.cursor = null;
}
function resizeToWidth(width: number): void {
  const element = worksheet.context.resizing.el;
  if (element === null) return;
  (
    element.parentNode?.parentNode?.parentNode?.firstChild?.childNodes.item(
      (element.getAttribute("d-x") as number | null) || -1,
    ) as HTMLElement
  ).style.width = `${width}px`;
}
// virt. coords
function isHeader(target: HTMLElement): boolean {
  return !target.hasAttribute("d-y") && target.hasAttribute("d-x");
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
  return coord < 6;
}
function currentResizeWidth(mouseEvent: MouseEvent<HTMLElement>): number {
  const coord =
    mouseEvent.clientX -
    (worksheet.context.resizing.el?.offsetLeft || 0) -
    mouseEvent.currentTarget.offsetLeft;
  return coord;
}
// UTILITY //

// HANDLERS //
const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
  if (isHeader(e.target) && !isResize() && isMouseOnResize(e)) {
    setResize(e.target);
    return;
  }
};
const handleMouseUp = (e: MouseEvent<HTMLElement>) => {
  if (isResize()) {
    const width = currentResizeWidth(e);
    if (width > 5) {
      resizeToWidth(width);
    }
    unsetResize();
    unsetResizeCursor(e);
  }
};
const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
  if (isResize()) {
    return;
  }
  if (isHeader(e.target) && !isResize()) {
    if (isMouseOnResize(e)) {
      setResizeCursor(e);
    } else {
      unsetResizeCursor(e);
    }
  }
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
