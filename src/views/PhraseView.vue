<script setup lang="ts">
import AppTitle from '../components/AppTitle.vue'
import AppNavigation from '../components/AppNavigation.vue'
</script>

<template>
  <div class="wrapper">
    <div class="sizer">

      <AppNavigation></AppNavigation>

      <div class="card" id="card">
        <div class="card-body">

          <div class="card-left" id="left">

            <AppTitle :text="dynamicText"></AppTitle>

            <template v-for="(sentence, index) in phrases_divided" :key="index">
              <p class="card-text">
                <template v-for="(word, index) in sentence.words" :key="index">

                  <span v-if="sentence.selected?.hasOwnProperty(word)" :data-tooltip="getSecondValue(sentence.selected[word])"> <!--ZAKRÚŽKOVANÉ-->
                    <span class="circle-sketch-highlight" id="phrase" @click="handleClick(sentence.selected[word])">{{ word }}</span>&#160;
                  </span>

                  <span v-else class="realistic-marker-highlight" id="phrase">{{ word }}&#160;</span> <!--ZVÝRAZNENÉ-->
                
                </template>
              </p>
            </template>

          </div>

          <div class="card-middle">
            <p v-for="(pair, index) in Object.entries(selectedVerbToShown)" :key="index" id="textForSelected2">
              <span v-if="index < Object.keys(selectedVerbToShown).length - 1" id="textForSelected">{{ pair[0] }}: </span>
              <span v-if="index < Object.keys(selectedVerbToShown).length - 1" id="textForSelected2">{{ pair[1]}}<br></span>
            </p>
          </div>

          <div class="card-right" id="right">
            <div class="description">
              <p class="description2" id="textForSelected">Here you can select and find circled verb to get sight for
                their
                translation, sklonovanie</p>
            </div>
            <p class="group-name" id="textForSelected2"><span id="textForSelected"
                class="circle-sketch-highlight2">GROUP</span></p>
            <div class="group">
              <div class="left">
                <p class="p-group" id="textForSelected2">{{ groupForSelectedVerb.group }}</p>
                <p class="p-group" id="textForSelected2">{{ groupForSelectedVerb.yo }}</p>
                <p class="p-group" id="textForSelected2">{{ groupForSelectedVerb.tu }}</p>
                <p class="p-group" id="textForSelected2">{{ groupForSelectedVerb.el }}</p>
              </div>
              <div class="right">
                <p class="p-group" id="textForSelected2"></p>
                <p class="p-group" id="textForSelected2">{{ groupForSelectedVerb.nosotros }}</p>
                <p class="p-group" id="textForSelected2">{{ groupForSelectedVerb.vosotros }}</p>
                <p class="p-group" id="textForSelected2">{{ groupForSelectedVerb.ellos }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePhraseStoreAnimals, usePhraseStoreSchool } from "@/stores/phrase";
import { useSelectedTermsStore } from "@/stores/phrase";
import { useGroupFormsStore } from "@/stores/phrase";
export default {
  components: {
    AppTitle,
  },
  data() {
    // const vocabulary = useVocabularyStore(); keby som ponechala nevráti v cykle dĺžku lebo berie ako state nie ako pole
    const { $state: { phrases_animals } } = usePhraseStoreAnimals(); 
    const phrases = phrases_animals;

    const { $state: { phrases_school } } = usePhraseStoreSchool();
    const phrasesAnimals = phrases_school;

    const { $state: { selected_terms } } = useSelectedTermsStore();
    const arrOfVerbsToShown = selected_terms;

    const { $state: { groups_forms } } = useGroupFormsStore();
    const arrOfGroups = groups_forms;

    type Phrase = {
      sentence: string;
      selected: Record<string, string[]>;
    };

    return {
      phrases,
      phrasesAnimals,
      arrOfVerbsToShown,
      arrOfGroups,
      cardStyles: {},
      selectedVerbToShown: {},
      groupForSelectedVerb: {},
      topicID: '' as string | string[] | null,
      activePhrasesArray: [] as Phrase[],
      dynamicText: "TEXT" as string,
    };

  },
  computed: {
    phrases_divided() {
      const result = [];
      for (let i = 0; i < this.activePhrasesArray.length; i++) {
        if (this.activePhrasesArray[i].sentence) {  //zoberie sa každá bunka pola = každá veta s označenými pojmami
          const wordsArray = this.activePhrasesArray[i].sentence.split(" "); //riadok je rozdelený na samostatné slová
          if (this.activePhrasesArray[i].hasOwnProperty('selected')) { //ak táto veta má  vlastnosť s názvom selected
            result.push({
              words: wordsArray, //je push-nutá každá veta v podobe pola ktoré obsahuje jednotlivé slová
              selected: this.activePhrasesArray[i].selected
            });
          } else {
            result.push({
              words: wordsArray,
              selected: {}
            });
          }
        }
      }
      return result;
    },
  },
  watch: {
    '$route.params.topicID'(newTopicID) {
      this.topicID = newTopicID;
      this.updatePhrasesArray();
    },
  },
  mounted() {
    this.topicID = this.$route.params.topicID;
    this.updatePhrasesArray();
  },
  methods: {
    getSecondValue(selected: Array<string>) {
      const value = selected[1]; //preklad
      return value
    },
    updatePhrasesArray() {
      if (this.topicID === '123') {
        this.activePhrasesArray = this.phrasesAnimals;
      } else if (this.topicID === '1234') {
        this.activePhrasesArray = this.phrases;
      }
    },
    handleClick(selected: Array<string>) {
      const value = selected[0];
      console.log("Value is " + value);
      var result = {};
      var result2 = {};
      var group = "";
      for (let i = 0; i < this.arrOfVerbsToShown.length; i++) {
        const keysOfVerbs = Object.keys(this.arrOfVerbsToShown[i].verb);
        if (keysOfVerbs.includes(value)) {
          group = this.arrOfVerbsToShown[i].verb[value][6];
          result = {
            verb: value,
            yo: this.arrOfVerbsToShown[i].verb[value][0],
            tu: this.arrOfVerbsToShown[i].verb[value][1],
            el: this.arrOfVerbsToShown[i].verb[value][2],
            nosotros: this.arrOfVerbsToShown[i].verb[value][3],
            vosotros: this.arrOfVerbsToShown[i].verb[value][4],
            ellos: this.arrOfVerbsToShown[i].verb[value][5],
            group: group //je tu uložená skupina ako string "ar"...
          };
          break;
        }
      }
      this.arrOfGroups.forEach((item) => { //iterujem
        const keyOfGroup = Object.keys(item.group); //dostanem kľúče v podobe ar, er, ir
        if (keyOfGroup.includes(group)) {
          //zistím, či kľúče obsahujú hodnotu vytiahnutú z vybraného slovesa
          result2 = {
            group: keyOfGroup,
            yo: item.group[keyOfGroup][0],
            tu: item.group[keyOfGroup][1],
            el: item.group[keyOfGroup][2],
            nosotros: item.group[keyOfGroup][3],
            vosotros: item.group[keyOfGroup][4],
            ellos: item.group[keyOfGroup][5],
          };
        }
      });
      this.selectedVerbToShown = result;
      this.groupForSelectedVerb = result2;
    }
  },
}
</script>

<style scoped>
.sizer {
  width: 80%;
  background-color: #e8eaa1;
  border-radius: 2%;
  border: solid;
  border-color: rgb(85, 107, 47);
}

.card-header:first-child {
  border-radius: 7px;
}

.wrapper {
  height: 75vh;
  width: 95vw;
  display: flex;
  justify-content: center;
}

.card {
  border: none;
}

.group-name {
  margin-top: 5%;
  margin-bottom: 0px;
}

.card-left {
  width: 60%;
}

#textForSelected {
  color: #b39eb5
}

#textForSelected2 {
  color: rgb(85, 107, 47)
}


.title {
  font-size: x-large;
  background-color: rgb(85, 107, 47);
  width: 15%;
  border: solid;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card-right {
  width: 25%;
  display: flex;
  flex-direction: column;
  padding-left: 2%;
  border-top: solid;
  border-right: solid;
  border-bottom: solid;
  border-color: rgb(85, 107, 47);
  padding-top: 2%;
  background-color: white;
  z-index: 1;
  -webkit-box-shadow: 11px 23px 30px -28px rgba(0, 0, 35, 1);
  -moz-box-shadow: 11px 23px 30px -28px rgba(0, 0, 35, 1);
  box-shadow: 11px 23px 30px -28px rgba(0, 0, 35, 1);
}

.left {
  padding-left: 5%;
  padding-bottom: 5%;
}

.right {
  padding-top: 0px;
}

.group {
  padding-top: 5%;
  display: flex;
  border: solid;
  align-items: center;
  z-index: 1;
}

.card-middle {
  width: 25%;
  float: right;
  border-top: solid;
  border-left: solid;
  border-bottom: solid;
  border-color: rgb(85, 107, 47);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
  background-color: white;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.end-right {
  display: flex;
  justify-content: end;
}

.card-name {
  width: 100%;
}

.description {
  margin-top: 5%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 70%;
  z-index: 1;
  border: solid;
  border-radius: 50%;
  background-color: rgb(85, 107, 47);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.description2 {
  font-size: 20px;
}

p {
  z-index: -1;
  transform: rotate(-2deg);
}

#card {
  background-color: transparent;
}

.card-left {
  width: 50%;
}

#phrase {
  color: rgb(85, 107, 47);
}

.collapse {
  background-color: transparent;
}

.card {
  background-color: transparent;
}

.card-body {
  width: 100%;
  padding: 5%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
}

[data-tooltip]::before {
  content: attr(data-tooltip);
  position: absolute;
  opacity: 0;

  transition: all 0.15s ease;
  padding: 10px;
  color: #333;
  border-radius: 10px;
  box-shadow: 2px 2px 1px silver;

}

[data-tooltip]:hover::before {
  opacity: 1;

  background: rgb(85, 107, 47);
  color: white;
  margin-top: -50px;
  border-radius: 50%;

}

[data-tooltip]:not([data-tooltip-persistent])::before {
  pointer-events: none;
}

* {
  font-family: 'Gloria Hallelujah', cursive;
  font-size: large;
  color: white;
  font-weight: bold
}

body {
  background-color: #fbfbfb;
}

.list-group-item {
  margin-top: 5% !important;
  border-radius: 80%;
  border-bottom: solid;
  border-bottom-color: #5b446a;
  font-size: small;
  width: 60%;
  background-color: #4c9173;
  box-shadow: -1px 0px 12px 3px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 0px 12px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 0px 12px 3px rgba(0, 0, 0, 0.75);
}

.list-group-item+.list-group-item.active {
  margin-top: 5% !important;
  border-radius: 50%;
  box-shadow: -1px 0px 12px 3px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 0px 12px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 0px 12px 3px rgba(0, 0, 0, 0.75);
}

.card-text {
  margin: 5%
}

.text {
  color: rgba(156, 129, 153)
}

.realistic-marker-highlight {
  position: relative;
}

.realistic-marker-highlight:before {
  content: "";
  background-color: #e8ccd7;
  width: 100%;
  height: 1em;
  position: absolute;
  z-index: -1;
  filter: url(#marker-shape);
  left: -0.25em;
  top: 0.1em;
  padding: 0 0.25em;
}

.circle-sketch-highlight {
  position: relative;
  cursor: pointer;
}

.p-group {
  margin-bottom: 0px;
}

.circle-sketch-highlight:before {
  content: "";
  z-index: -1;
  left: -0.5em;
  border-width: 2px;
  border-style: solid;
  border-color: #ffcff1 |;
  position: absolute;
  border-right-color: transparent;
  width: 100%;
  height: 1em;
  transform: rotate(2deg);
  opacity: 0.7;
  border-radius: 50%;
  padding: 0.25em;
}

.circle-sketch-highlight:after {
  content: "";
  z-index: -1;
  left: -0.5em;
  padding: 0.25em;
  border-width: 2px;
  border-style: solid;
  border-color: #ffcff1 |;
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

.p-group {
  margin-bottom: 0px;
}

.circle-sketch-highlight2:before {
  content: "";
  z-index: -1;
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
  padding: 0.25em;
}

.circle-sketch-highlight:after {
  content: "";
  z-index: -1;
  left: -0.5em;
  padding: 0.25em;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  position: absolute;
  width: 100%;
  height: 1.2em;
  transform: rotate(-1deg);
  opacity: 0.7;
  border-radius: 50%;
}
</style>
