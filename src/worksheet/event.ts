import worksheet from "./base";

//
// UTILITY //
function isResize(): boolean {
  return worksheet.context.resizing.state;
}
function setResize(target: HTMLElement): void {
  worksheet.context.resizing.state = true;
  worksheet.context.resizing.el = target;
}
function unsetResize(): void {
  worksheet.context.resizing.state = false;
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
  if (!element) return;
  const col = document
    .getElementById("colgroup")
    ?.childNodes.item(getX(element) || -1) as HTMLElement;
  if (!col) return;
  col.style.width = `${width}px`;
}
function setupResizer(target: HTMLElement, container: HTMLElement): void {
  if (worksheet.context.resizing.resizer === null) {
    worksheet.context.resizing.resizer = document.getElementById("resizer");
  }
  worksheet.context.resizing.resizer!.style.visibility = "visible";
  worksheet.context.resizing.resizer!.style.left = `${target.getBoundingClientRect().right}px`;
  worksheet.context.resizing.resizer!.style.height = `${container.getBoundingClientRect().height}px`;
}
function hideResizer() {
  if (worksheet.context.resizing.resizer === null) {
    worksheet.context.resizing.resizer = document.getElementById("resizer");
  }
  worksheet.context.resizing.resizer!.style.visibility = "hidden";
}
function moveResizer(e: MouseEvent<HTMLElement>) {
  if (worksheet.context.resizing.resizer === null) {
    worksheet.context.resizing.resizer = document.getElementById("resizer");
  }
  worksheet.context.resizing.resizer!.style.left = `${e.clientX}px`;
}
function isResizable(target: HTMLElement): boolean {
  return target.hasAttribute("d-resizable");
}
function isHeader(target: HTMLElement): boolean {
  return !target.hasAttribute("d-y") && target.hasAttribute("d-x");
}
function getX(target: HTMLElement): number | null {
  return target.getAttribute("d-x") as number | null;
}
function isMouseOnResize(mouseEvent: MouseEvent<HTMLElement>): boolean {
  const coord =
    (mouseEvent.clientX -
      mouseEvent.target.offsetLeft -
      mouseEvent.currentTarget.offsetLeft -
      mouseEvent.target.offsetWidth) *
    -1;
  return coord < 7;
}
function currentResizeWidth(mouseEvent: MouseEvent<HTMLElement>): number {
  const coord =
    mouseEvent.clientX -
    (worksheet.context.resizing.el?.offsetLeft || 0) -
    mouseEvent.currentTarget.offsetLeft;
  return coord;
}
// UTILITY //
//
//
//
// HANDLERS //
const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
  if (
    isResizable(e.target) &&
    isHeader(e.target) &&
    !isResize() &&
    isMouseOnResize(e)
  ) {
    setResize(e.target);
    setupResizer(e.target, e.currentTarget);
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
    hideResizer();
  }
};
const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
  if (isResize()) {
    moveResizer(e);
  }
  if (isResizable(e.target) && isHeader(e.target) && !isResize()) {
    if (isMouseOnResize(e)) {
      setResizeCursor(e);
    } else {
      unsetResizeCursor(e);
    }
  }
};
// HANDLERS //
//

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
