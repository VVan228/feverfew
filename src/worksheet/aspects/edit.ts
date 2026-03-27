import worksheet from "../base";

function inputPhaseIn(target: HTMLElement): void {
  const content = target.childNodes.item(0);
  target.removeChild(content);

  const input = document.createElement("input");

  const cellSize = target.getBoundingClientRect();
  input.style.width = `${cellSize.width}px`;
  input.style.height = `${cellSize.height - 2}px`;
  input.style.minHeight = `${cellSize.height - 2}px`;

  // TODO: not text probably?
  input.value = content.textContent || "null";
  worksheet.context.editing.state = true;
  worksheet.context.editing.element = target;

  // UNFOCUS = commit
  input.addEventListener("focusout", inputPhaseOut);

  target.appendChild(input);
  target.classList.add("edit");
  input.focus();
}
function inputPhaseOut(): void {
  worksheet.context.editing.state = false;
  if (worksheet.context.editing.element === null) return;
  worksheet.context.editing.element.classList.remove("edit");

  const input = worksheet.context.editing.element.childNodes.item(
    0,
  ) as HTMLInputElement;
  if (input === null) return;
  const content = input.value;

  worksheet.context.editing.element.removeChild(input);
  worksheet.context.editing.element.textContent = content;
  worksheet.context.editing.element = null;
}

async function handleDbClick(e: MouseEvent<HTMLElement>) {
  if (worksheet.context.editing.state) return;
  inputPhaseIn(e.target);
}

export default { handleDbClick };
