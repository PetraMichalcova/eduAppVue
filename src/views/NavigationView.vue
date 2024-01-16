<script setup lang="ts">
import AppNavigationButton from '../components/AppNavigationButton.vue'
</script>


<template>
  <div class="holder">
    <div class="cont">

      <router-link :to="{ name: 'vocabulary', params: { topic: 'vocabulary', topicID: topicID } }">
        <app-navigation-button :title="title1"></app-navigation-button>
      </router-link>

      <router-link :to="{ name: 'exercise', params: { topic: 'exercise', topicID: topicID } }">
        <app-navigation-button :title="title3"></app-navigation-button>
      </router-link>

      <router-link :to="{ name: 'conversation', params: { topic: 'conversation', topicID: topicID } }">
      <app-navigation-button :title="title2"></app-navigation-button>
      </router-link>

      <div class="d4" id="d4">
          <div class="d4-sub">
            <h5>Choose from our offer</h5>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { 
  components: {
    AppNavigationButton,
  },
  data() {
    return {
      topicID: "1234",
      title1: "VOCABULARY",
      title2: "CONVERSATION",
      title3: "EXERCISE"
    };
  }
};
</script>

<style scoped>
.cont {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  max-width: 35%;
  width: 100%;
}

.cont .d1,
.cont .d2,
.cont .d3 {
  aspect-ratio: 1;
  box-shadow: -1px 1px 29px 0px rgba(64, 59, 64, 0.74);
  margin: 5%;
  border: solid;
  border-color: aliceblue;
  background-color: rgb(85, 107, 47)
}

div {
  border-radius: 50%;
}


.holder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

h2 {
  margin-left: 30%;
  margin-top: 3%;
  margin-bottom: 2%;
  color: white;
  font-weight: bold;
}

.d1-sub,
.d2-sub,
.d3-sub {
  box-sizing: border-box;
  margin: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.d4 {
  display: flex;
  justify-content: center;
  align-items: center;
}

h5 {
  color: white;
  font-weight: bolder;
}

p {
  color: white
}

a:hover {
  background-color: transparent;
  text-decoration: none;
}

.d1:hover,
.d2:hover,
.d3:hover {
  background-color: rgb(156, 129, 153);
  cursor: pointer;
  border: solid;
  border-color: white;
  color: white
}

.cont .d4 {
  background-color: rgb(156, 129, 153);
  display: flex;
  justify-content: center;
  border: solid;
  border-color: white;
}

* {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: 25px;
  font-weight: 500
}
</style>