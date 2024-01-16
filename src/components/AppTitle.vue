<template>
  <p class="titleComponent">{{ text }}</p>
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
.titleComponent {
  font-size: x-large;
  background-color: rgb(85, 107, 47);
  color: white;
  width: 100px;
  border: solid;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transform: rotate(-2deg);
  margin-left: 5%;
}
</style>