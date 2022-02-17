export default function useWindowEvent(event, handler, addOrDestroy) {
  if (addOrDestroy === "add") {
    window.addEventListener(event, handler);
  }

  if (addOrDestroy === "destroy") {
    window.removeEventListener(event, handler);
  }
}
