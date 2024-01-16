<template>
<span class="circle-sketch-highlight" id="word">{{ word }}</span>&#160;
</template>

<script lang="ts">
export default {
    props: {
    word: String,
  },
};
</script>

<style scoped>
.circle-sketch-highlight {
  position: relative;
  cursor: pointer;
}

.circle-sketch-highlight:before {
  content: "";
  z-index: -1;
  left: -0.5em;
  border-width: 2px;
  border-style: solid;
  border-color: #5b446a;
  position: absolute;
  border-right-color: transparent;
  width: 100%;
  height: 1em;
  transform: rotate(2deg);
  opacity: 0.7;
  border-radius: 50%;
  padding: 0.25em;
  color: rgb(85, 107, 47);
  z-index: 1;
}


.circle-sketch-highlight:after {
  content: "";
  z-index: -1;
  left: -0.5em;
  padding: 0.25em;
  border-width: 2px;
  border-style: solid;
  border-color: white;
  border-left-color: transparent;
  border-top-color: transparent;
  position: absolute;
  width: 100%;
  height: 1em;
  transform: rotate(-1deg);
  opacity: 0.7;
  border-radius: 50%;
  z-index: -1;
}

#word {
color: rgb(85, 107, 47);
font-family: 'Gloria Hallelujah', cursive;
font-weight: bolder;
}

</style>