import { removeListeners, setListeners } from "./event";

const worksheet = {
  context: {
    resizing: {
      state: false,
      el: null as null | HTMLElement,
      resizer: null as null | HTMLElement,
    },
  },
  event: {
    setListeners,
    removeListeners,
  },
};

export default worksheet;
