<template>
  <div class="mast">
    <div class="container">
      <div class="image-container">
        <img ref="imageRef" src="https://source.unsplash.com/Mv9hjnEUHR4" />
      </div>
      <div ref="textRef" class="text-container">
        <p>
          Meatball, 9. Barks at Amazon guy. Likes sharing your apple slices.
          Wants you to grab the toy but won't let you have it.
        </p>
      </div>
    </div>
  </div>
  Width: {{ imageWidth }}
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
export default {
  name: "Mast",
  setup() {
    let imageWidth = ref(0);

    //template refs
    let imageRef = ref(null);
    let textRef = ref(null);

    function resizeHandler() {
      //tracking of width changes
      imageWidth.value = imageRef.value.offsetWidth;
    }

    onMounted(() => {
      //set initial value
      imageWidth.value = imageRef.value.offsetWidth;

      //add listener to track resize
      window.addEventListener("resize", resizeHandler);
    });

    onUnmounted(() => {
      //remove listener
      window.removeEventListener("resize", resizeHandler);
    });

    watch(imageWidth, () => {
      //initiate side effects to change text size when window width changes
      if (imageWidth.value < 150) {
        textRef.value.style.fontSize = ".8em";
        textRef.value.style.lineHeight = "1.3";
      }
      if (imageWidth.value < 200 && imageWidth.value > 150) {
        textRef.value.style.fontSize = "1em";
        textRef.value.style.lineHeight = "1.4";
      }
      if (imageWidth.value > 200) {
        textRef.value.style.fontSize = "1.3em";
        textRef.value.style.lineHeight = "1.5";
      }
    });

    return { imageRef, textRef, imageWidth };
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
