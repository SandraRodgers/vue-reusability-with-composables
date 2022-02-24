import { ref, watch, onMounted, onUnmounted } from "vue";
import useWindowEvent from "./useWindowEvent";

export default function useResizeText(
  triggerElement,
  reactElement,
  breakpoints,
  styles
) {
  const { fontSize, lineHeight } = styles;
  const { medium, large } = breakpoints;

  let elementWidth = ref(0);

  function resizeHandler() {
    //tracking of width changes
    if (triggerElement.value) {
      elementWidth.value = triggerElement.value.offsetWidth;
    }
  }

  //set initial value
  onMounted(() => {
    if (triggerElement.value) {
      elementWidth.value = triggerElement.value.offsetWidth;
      setTextStyles();
    }
  });

  //function to set text styles on mount and in watcher
  function setTextStyles() {
    if (elementWidth.value < medium) {
      //small
      reactElement.value.style.fontSize = fontSize.small;
      reactElement.value.style.lineHeight = lineHeight.small;
    }
    if (elementWidth.value < large && elementWidth.value > medium) {
      //medium
      reactElement.value.style.fontSize = fontSize.medium;
      reactElement.value.style.lineHeight = lineHeight.medium;
    }
    if (elementWidth.value > large) {
      //large
      reactElement.value.style.fontSize = fontSize.large;
      reactElement.value.style.lineHeight = lineHeight.large;
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
