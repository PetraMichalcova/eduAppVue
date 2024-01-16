<template>
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">

      <router-link to="/navigation">
        <li class="nav-item">
          <a class="nav-link1" href="#">⤺</a>
        </li>
      </router-link>


      <router-link :to="{ name: topic, params: { topic: topic, topicID: topicIDAnimals } }">
        <li class="nav-item">
          <a class="nav-link" href="#">Animals</a>
        </li>
      </router-link>


      <router-link :to="{ name: topic, params: { topic: topic, topicID: topicIDSchool } }">
        <li class="nav-item">
          <a class="nav-link">School</a>
        </li>
      </router-link>

    </ul>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      topicIDAnimals: '1234',
      topicIDSchool: '123',
      topic: '' as string
    };
  },
  beforeMount() {
    this.topic = String(this.$route.params.topic);
  }
}
</script>  

<style scoped>
#card {
  background-color: rgb(85, 107, 47);
  border-radius: 2%;
}

.card-header {
  background-color: rgb(85, 107, 47);
}

* {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: large;
  color: white;
  font-weight: bold
}

a.nav-link1 {
  font-size: 30px;
  margin: 0px;
  padding: 0px;
}

a.nav-link:hover {
  border: none;
  background-color: transparent;
}
</style>