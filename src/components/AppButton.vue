<template>
  <button type="submit" id="btn-oval">
    <p class="btn">{{ text }}</p>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
#btn-oval {
  border: solid;
  border-radius: 50%;
  background-color: rgb(85, 107, 47);
  border-color: white;
  color: white;
  width: 140px;
  font-size: larger;
  font-weight: 700;
  box-shadow: none;
}

#btn-oval:hover {
  border: solid;
  border-radius: 50%;
  background-color: rgba(156, 129, 153);
  border-color: white;
  color: white;
  width: 140px;
  font-size: larger;
  font-weight: 700;
  box-shadow: none;
}

.btn {
  margin-bottom: 2% !important;
  font-size: large;
  color: white;
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 25px;
  font-weight: 500
}
</style>

