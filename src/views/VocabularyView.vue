<script setup lang="ts">
import AppNavigation from '../components/AppNavigation.vue'
import AppTitle from '../components/AppTitle.vue'
import AppButton from '../components/AppButton.vue'
</script>

<template>
  <div class="wrapper"> 
  <div class="sizer">

     <app-navigation></app-navigation>

    <div class="holder">

      <div class="container1"> <!--OBRAZKY ZVIERATIEK-->
       
        <app-title :text="dynamicText"></app-title>

        <div class="row">
          <div v-for="(pair, pairIndex) in shownImages" :key="pairIndex" class="col-md-4"> <!-- stĺpec obrázkov / pair obsahuje img a text-->
            <div v-for="(item, itemIndex) in pair" :key="itemIndex" @click="handleImg(item.img)" class="column"> <!--jednotlivý obrázok-->
              <img v-if="item.img" :src="'../src/assets/' + item.img" :class="{
                'highlight-img': clickedImg === item.img,
                'matched': matched.includes(item.img)
              }">
            </div>
          </div>
        </div>
      </div>

      <div class="container2"> <!--OBRÁZKY TEXTU-->
        <p class="title2">TEXT</p>
        <div class="row">
          <div class="col-md-4" v-for="(pair, pairIndex) in shownText" :key="pairIndex">
            <div class="column" v-for="(item, itemIndex) in pair" :key="itemIndex" @click="handleText(item.text)">
              <img :class="{ 
                'highlight-img': clickedText == item.text,
                'matched': matched.includes(item.img)
                 }"
                v-if="item.img" :src="'../src/assets/' + item.text">
            </div>
          </div>
        </div>
      </div>

      <div class="container3"> <!--TLAČÍTKA S POPISOM-->

       <app-button :text="dynamicTextBtn1" @click="reset()"></app-button>
       <app-button :text="dynamicTextBtn2" @click="shuffle()"></app-button>

        <div class="description">

          <p id="info"><span class="circle-sketch-highlight2">VIOLET</span>&#160;</p>
          <p id="info">means you chose</p>

          <p id="info"><span class="circle-sketch-highlight">GREEN</span>&#160;</p>

          <p id="info">means MATCH</p>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script lang="ts">
import { useColorStore } from "@/stores/vocab";
import { useAnimalStore } from "@/stores/vocab";

export default {
  components: {
    AppTitle,
    AppButton
  },
  data() {
    const { $state: colorStore } = useColorStore();
    const colors = colorStore.color_store;

    const { $state: animalStore } = useAnimalStore();
    const animals = animalStore.animalStore;

    type Phrase = {
      img: string;
      text: string;
    };

    return {
      colors,
      animals,

      topicID: '' as string | string[] | null,

      activePhrasesArrayImages: [] as Phrase[], //medzdipole
      activePhrasesArrayText: [] as Phrase[],   

      shownImages: [], //vykreslené obrázky - musia byť dvojmo, keďže chcem shuffled poradie
      shownText: [], //vykreslený text

      clickedImg: '',
      clickedText: '',

      matched: [] as string[],

      dynamicText: "PLAY:" as string,
      dynamicTextBtn1: "RESET" as string,
      dynamicTextBtn2: "SHUFFLE" as string,
    };
  },
  watch: {
    '$route.params.topicID'(newTopicID) {
      this.topicID = newTopicID;
      this.updatePhrasesArray();
      this.shuffle();
    },
    clickedImg(newclickedImg) {
      var adjustText = this.clickedText.replace('2', '');
      if (newclickedImg == adjustText && this.clickedText != '' && this.clickedImg != '') {
        this.matched.push(newclickedImg);
        this.clickedImg = '';
        this.clickedText = '';
        
      }
    },
    clickedText(newclickedText) {
      var adjustText = newclickedText.replace('2', '');
      if (this.clickedImg == adjustText && this.clickedText != '' && this.clickedImg != '') {
        this.matched.push(this.clickedImg);
        this.clickedText = '';
        this.clickedImg = '';
      }
    },
    matched: {
      handler(newMatched) {
        if (newMatched.length === 6) {
          this.matched = [];
          alert('DONE!');
        }
      },
      deep: true
    },
  },
  beforeMount() {
    this.topicID = this.$route.params.topicID;
    this.updatePhrasesArray();
    this.shuffle();
  },
  methods: {
    getSecondValue(selected: Array<string>) {
      const value = selected[1]; //preklad
      return value
    },
    updatePhrasesArray() {
      if (this.topicID === '123') {
        this.activePhrasesArrayImages = this.colors;
        this.activePhrasesArrayImages = [...this.colors];
        this.activePhrasesArrayText = [...this.colors];
      } else if (this.topicID === '1234') {
        this.activePhrasesArrayImages = this.animals;
        this.activePhrasesArrayImages = [...this.animals];
        this.activePhrasesArrayText = [...this.animals];
      }
    },
    handleImg(data: string) {
      this.clickedImg = data;
    },
    handleText(data: string) {
      this.clickedText = data;
    },
    shuffle() {
      const itemsPerPair = 3;
      const totalItems = this.activePhrasesArrayImages.length;
      this.shownImages = [];
      this.shownText = [];
      this.matched = [];

      this.shuffleArray(this.activePhrasesArrayImages);
      this.shuffleArray(this.activePhrasesArrayText);

      for (let i = 0; i < totalItems; i += itemsPerPair) { //rozdelenie poľa na 2 páry pre 2 stĺpce
        this.shownImages.push(this.activePhrasesArrayImages.slice(i, i + itemsPerPair));
        this.shownText.push(this.activePhrasesArrayText.slice(i, i + itemsPerPair));
      }
    },
    shuffleArray(arr: Array<string>) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    },
    reset() {
      this.matched = [];
      this.clickedImg = '';
      this.clickedText = '';
    }
  }
}
</script>

<style scoped>

.wrapper {
  height: 80vh;
  width: 95vw;
  display: flex;
  justify-content: center;
}

.card-header:first-child {
  border-radius: 7px;
}
.card {
  border: solid;
  border-radius: 50%;
  border-color: rgb(85, 107, 47);
}

#info {
  display: flex;
  justify-content: center;
  font-size: larger;
  margin-top: 10%;
  margin-bottom: 10%;
}

.reset {
  border: solid;
  border-radius: 10%;
  border-color: white;
  height: 10%;
  width: 80%;
  background-color: rgb(85, 107, 47);
  font-family: 'Gloria Hallelujah', cursive;
  color: white;
  margin-top: 20%;
}

.shuffle {
  border: solid;
  border-radius: 10%;
  border-color: white;
  height: 10%;
  width: 80%;
  background-color: rgb(85, 107, 47);
  font-family: 'Gloria Hallelujah', cursive;
  color: white;
  margin-top: 4%;
}

.sizer {
  width: 70%;
  background-color: #e8eaa1;
  z-index: 1;
  border: solid;
  border-color: rgb(85, 107, 47);
  border-radius: 2%;
}

.row {
  justify-content: center;
}

.container1 {
  width: 40%;
  margin-top: 2%;
  margin-bottom: 2%;
}

.container2 {
  width: 40%;
  margin-top: 2%;
  margin-bottom: 2%;
}

.container3 {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7%;
  margin-bottom: 2%;
  margin-right: 3%;
  margin-left: 3%;
}

.holder {
  display: flex;
  flex-direction: row;
  width: 100%
}

.highlight-img {
  border: solid;
  border-width: 10px;
  border-color: blueviolet;
}

.matched {
  border: solid;
  border-width: 10px;
  border-color: rgb(85, 107, 47);
}

img {
  max-width: 180px;
  max-height: 180px;
  border-radius: 50%;
  margin-top: 6%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border: solid;
  border-width: 10px;
  border-color: #acc6aa;
}

.col-md-4 {
  margin-right: 2%;
}

.description {
  margin-top: 8%;
  border: solid;
  border-radius: 50%;
  border-width: 6px;
  border-color: rgb(85, 107, 47);
  font-weight: bold;
  background-color: rgba(156, 129, 153);
  color: white;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

p {
  font-family: 'Gloria Hallelujah', cursive;
}

.circle-sketch-highlight {
  position: relative;
}

.circle-sketch-highlight:before {
  content: "";
  z-index: 2;
  left: -0.5em;
  border-width: 2px;
  border-style: solid;
  border-color: rgb(85, 107, 47);
  position: absolute;
  border-right-color: transparent;
  width: 100%;
  height: 1em;
  transform: rotate(2deg);
  opacity: 0.7;
  border-radius: 50%;
  padding: 0.1em;
}

.circle-sketch-highlight:after {
  content: "";
  z-index: 2;
  left: -0.5em;
  padding: 0em;
  border-width: 2px;
  border-color: rgb(85, 107, 47);
  border-left-color: transparent;
  border-top-color: transparent;
  position: absolute;
  width: 100%;
  height: 1em;
  transform: rotate(-1deg);
  opacity: 0.7;
  border-radius: 50%;
}

.circle-sketch-highlight2 {
  position: relative;
}

.circle-sketch-highlight2:before {
  content: "";
  z-index: 2;
  left: -0.5em;
  border-width: 2px;
  border-style: solid;
  border-color: blueviolet;
  position: absolute;
  border-right-color: transparent;
  width: 100%;
  height: 1em;
  transform: rotate(2deg);
  opacity: 0.7;
  border-radius: 50%;
  padding: 0.1em;
}

.circle-sketch-highlight2:after {
  content: "";
  z-index: 2;
  left: -0.5em;
  padding: 0em;
  border-width: 2px;
  border-color: blueviolet;
  border-left-color: transparent;
  border-top-color: transparent;
  position: absolute;
  width: 100%;
  height: 1em;
  transform: rotate(-1deg);
  opacity: 0.7;
  border-radius: 50%;
}

span {
  font-family: 'Gloria Hallelujah', cursive;
  font-weight: 500;
}

button {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

button:hover {
  background-color: rgba(156, 129, 153);
}

.title1 p.title2 {
  width: 100%;
  margin-top: 3%;
  margin-left: 15%;
  margin-bottom: 5%;
  font-size: x-large;
}

p.title1 {
  margin-left: 15%;
  margin-bottom: 5%;
  font-size: x-large;
  width: 18%;
  border: solid;
  border-radius: 50%;
  background-color: rgb(85, 107, 47);
  color: white;
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

p.title2 {
  color: #e8eaa1;
  font-size: x-large;
  margin-bottom: 5%;
}
</style>