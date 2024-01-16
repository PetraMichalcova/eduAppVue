<template>
<div class="d1" id="d1">
    <div class="d1-sub">
      <h5>{{title}}</h5>
    </div>
  </div>
</template>

<script lang="ts">
export default {
    props: {
    title: String,
  },
};
</script>

<style scoped>

h5 {
  color: white;
  font-weight: bolder;
  font-family: 'Gloria Hallelujah', cursive;
  font-size: larger;
}

.d1 {
  display: flex;
  justify-content: center;
  align-items: center;
}


.d1:hover {
  background-color: rgb(156, 129, 153);
  cursor: pointer;
  border: solid;
  border-color: white;
  color: white
}

</style>