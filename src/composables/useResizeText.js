import { ref, watch, onMounted, onUnmounted } from "vue";
import useWindowEvent from "./useWindowEvent";

export default function useResize(triggerElement, reactElement) {
  let elementWidth = ref(0);

  //handler to send into useWindowEvent
  function resizeHandler() {
    if (triggerElement.value) {
      elementWidth.value = triggerElement.value.offsetWidth;
    }
  }

  //set initial values for elementWidth and text styles
  onMounted(() => {
    if (triggerElement.value) {
      elementWidth.value = triggerElement.value.offsetWidth;
      setTextStyles();
    }
  });

  //function to set text styles on mount and in watcher
  function setTextStyles() {
    if (elementWidth.value < 150) {
      reactElement.value.style.fontSize = ".8em";
      reactElement.value.style.lineHeight = "1.3";
    }
    if (elementWidth.value < 200 && elementWidth.value > 150) {
      reactElement.value.style.fontSize = "1em";
      reactElement.value.style.lineHeight = "1.4";
    }
    if (elementWidth.value > 200) {
      reactElement.value.style.fontSize = "1.3em";
      reactElement.value.style.lineHeight = "1.5";
    }
  }

  //add and destroy event listeners
  useWindowEvent("resize", resizeHandler, "add");
  onUnmounted(() => {
    useWindowEvent("resize", resizeHandler, "destroy");
  });

  //watch elementWidth and set text styles
  watch(elementWidth, () => {
    setTextStyles();
  });

  return { elementWidth };
}
