<template>
  <div class="mast">
    <div class="container">
      <div class="image-container">
        <img ref="imageRef" src="../assets/meatball.jpeg" />
      </div>
      <div ref="textRef" class="text-container">
        <p>
          Meatball, 9. Barks at Amazon guy. Likes sharing your apple slices.
          Wants you to grab the toy but won't let you have it.
        </p>
      </div>
    </div>
  </div>
  Width:{{ elementWidth }}
</template>

<script>
import { ref } from "vue";
import useResizeText from "../composables/useResizeText";
export default {
  name: "Mast",
  setup() {
    //template refs
    let imageRef = ref(null);
    let textRef = ref(null);

    //destructure to get data sent back from the composable
    //get updated width for template
    const { elementWidth } = useResizeText(imageRef, textRef);

    return { imageRef, textRef, elementWidth };
  },
};
</script>

<style scoped>
.mast {
  display: flex;
  justify-content: center;
  width: 100%;
}
.container {
  display: flex;
  justify-content: center;
  width: 60vw;
}
.image-container {
  display: flex;
  justify-content: center;
  width: 60%;
}

.text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Helvetica Neue";
  font-size: 1.3em;
  line-height: 1.5;
  width: 40%;
}

img {
  width: 50%;
}
</style>
