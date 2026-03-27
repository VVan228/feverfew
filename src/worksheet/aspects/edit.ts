import worksheet from "../base";

function inputPhaseIn(target: HTMLElement): void {
  const content = target.childNodes.item(0);
  target.removeChild(content);

  const input = document.createElement("input");

  const cellSize = target.getBoundingClientRect();
  input.style.width = `${cellSize.width}px`;
  input.style.height = `${cellSize.height - 2}px`;
  input.style.minHeight = `${cellSize.height - 2}px`;

  input.value = content.textContent || "null";

  target.appendChild(input);
  target.classList.add("edit");
  input.focus();
}
function inputPhaseOut(): void {}

function handleDbClick(e: MouseEvent<HTMLElement>) {
  inputPhaseIn(e.target);
}

export default { handleDbClick };
