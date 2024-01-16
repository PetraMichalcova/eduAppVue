[<script setup lang="ts">
</script>

<template>
    <div class="wrapper">
        <div class="sizer">

            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <router-link to="/navigation">
                        <li class="nav-item">
                            <a class="nav-link1" href="#">⤺</a>
                        </li>
                    </router-link>
                </ul>
            </div>

            <div class="card" id="card">
                <div class="card-body">

                    <div class="first">
                        <div class="second" v-if="!isElseBranch">
                            <p><span class="realistic-marker-highlight">You can type your value</span></p>
                            <p> <span class="realistic-marker-highlight">you could see in</span></p>
                            <p><span class="realistic-marker-highlight">the vocab section</span></p>
                        </div>

                        <div class="third" v-if="!isElseBranch">
                            <div class="col-auto">
                                <label class="sr-only" for="inlineFormInput">Name</label>
                                <p class="card-text1" id="shownTerm"> TERM </p>
                                <p id="shownTerm"> {{ shownTerm }} </p>
                            </div>

                            <div class="col-auto-m">
                                <p id="shownTerm"> YOUR VALUE </p>
                                <label class="sr-only" for="inlineFormInputGroup">Username</label>
                                <div class="input-group mb-2">
                                    <input type="text" class="form-control" id="inlineFormInputGroup" ref="userInputRef">
                                </div>
                            </div>

                            <div class="col-auto">
                                <button type="submit" class="btn btn-primary mb-2 button1" @click="sendToCheck()">↪</button>
                            </div>
                        </div>
                    </div>

                    <div class="holder0">
                        <div class="holder" v-if="isElseBranch">
                            <div class="subholder1">
                                <p class="col-name" id="textForSelected2">SET</p>
                                <p v-for="(pair, index) in arrFilledByUser" :key="index">
                                    {{ pair.term }}
                                </p>
                            </div>
                            <div class="subholder2">
                                <p class="col-name" id="textForSelected2">YOU</p>
                                <p v-for="(pair, index) in arrFilledByUser" :key="index">
                                    {{ pair.userInputTerm }}
                                </p>
                            </div>
                            <div class="subholder3">
                                <p class="col-name" id="textForSelected2">?</p>
                                <p v-for="(pair, index) in arrFilledByUser" :key="index">
                                    {{ pair.matched }}
                                </p>
                            </div>
                        </div>
                        <div class="text-finished" v-if="isElseBranch">
                            <p>Your results for the typed</p>
                            <p>values you decided to</p>
                            <p>put according to</p>
                            <p>training vocabulary</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { useExerciseStore } from '@/stores/exercise';

export default {

data() {
    const { $state: exercise_store } = useExerciseStore();
    const arrExerciseAnimals = exercise_store.exercise_store;
    const exercise_store2 = useExerciseStore();

    type Exercise = {
        term: string;
        translTerm: string;
        userInputTerm: string;
    };

    type ExerciseFilledByUser = {
        term: string;
        translTerm: string;
        userInputTerm: string;
        matched: string
    };

    return {
        arrExerciseAnimals,

        iterator: 0 as number,
        activeArray: [] as Exercise[],
        exercise_store,
        topicID: '' as string | string[] | null,
        shownTerm: "",
        userInputTerm: "",
        exercise_store2,
        isElseBranch: false,
        arrFilledByUser: [] as ExerciseFilledByUser[]
    }
},
beforeMount() {
        this.topicID = this.$route.params.topicID;
        this.loadArrayForActiveTopic();
        this.shownTerm = this.activeArray[this.iterator].term;
        console.log("SHOWN" + this.shownTerm);
    },
watch: {
    '$route.params.topicID'(newTopicID) {
        this.topicID = newTopicID;
    },
},
methods: {
    sendToCheck() {
        const userInputValue = this.$refs.userInputRef.value;
        /*console.log("userinput is " + userInputValue);
        console.log(this.exercise_store2);*/
        this.exercise_store2.setUserInputTerm({ term: this.shownTerm, userInputTerm: userInputValue });
        /*console.log("EX STORE");
        console.log(this.exercise_store2);*/
        this.$refs.userInputRef.value = "";
        if (this.iterator < 5) {
            this.shownTerm = this.activeArray[++this.iterator].term
        } else {
            this.isElseBranch = true;
            this.exercise_store2.exercise_store.forEach(item => {
                this.arrFilledByUser.push({ term: item.term, translTerm: item.translTerm, userInputTerm: item.userInputTerm, matched: "✘" });
            });
            this.arrFilledByUser.forEach(item => {
                if (item.translTerm === item.userInputTerm) {
                    item.matched = "✔"
                }
            });
        }
    },
    shuffle() {
        for (let i = this.activeArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.activeArray[i], this.activeArray[j]] = [this.activeArray[j], this.activeArray[i]];
        }
    },
    loadArrayForActiveTopic() {
        if (this.topicID === '1234') {
            this.activeArray = [...this.arrExerciseAnimals];
        } else if (this.topicID === '123') {
            //keby som riešila iné
        }
        this.shuffle();
    }
},
}
</script>


<style scoped>
.first {
    display: flex;
    flex-direction: column;

}

.wrapper {
    width: 95vw;
    display: flex;
    justify-content: center;
}

.sizer {
    width: 70%;
    background-color: #e8eaa1;
    border-radius: 1%;
    border: solid;
    border-color: rgb(85, 107, 47);
}

.card-body {
    padding: 3%;
    background-color: #e8eaa1;
}

.form-control {
    border-radius: 50%;
    text-align: center;
}


.holder {
    width: 40%;
    border: solid;
    display: flex;
    background-color: #acc6aa;
    margin-left: 10%;
    border-radius: 50%;
}

.subholder1 {
    width: 15%;
    margin-left: 21%;
    background-color: #acc6aa;
    margin-top: 8%;
    margin-bottom: 5%;
    border-radius: 50%;
}

.subholder2 {
    width: 15%;
    margin-left: 10%;
    background-color: #acc6aa;
    margin-top: 8%;
    margin-bottom: 5%;
}

.subholder3 {
    width: 15%;
    margin-left: 8%;
    background-color: #acc6aa;
    margin-top: 8%;
    margin-bottom: 10%;
    border-radius: 50%;
}

#textForSelected2 {
    border: solid;
    border-radius: 47%;
    background-color: rgb(85, 107, 47);
    color: white;
    display: flex;
    justify-content: center;
}

#shownTerm {
    color: white;
}

p {
    display: flex;
    justify-content: center;
}

.text-finished {
    margin-left: 5%;
    margin-top: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.third {
    display: flex;
    align-items: center;
    border: solid;
    background-color: rgb(85, 107, 47);
    border-radius: 2%;
    justify-content: center;

}

.realistic-marker-highlight {
    position: relative;
    z-index: 2;
}

.realistic-marker-highlight:before {
    content: "";
    background-color: #e8ccd7;
    width: 100%;
    height: 1em;
    position: absolute;
    z-index: 1;
    filter: url(#marker-shape);
    left: -0.25em;
    top: 0.1em;
    padding: 0 0.25em;
}


.col-auto {
    margin-bottom: 2%;
    margin: 3%;
}

.col-auto-m {
    margin-bottom: 2%;
    margin: 3%;
}

.holder0 {
    display: flex
}

* {
    font-family: 'Gloria Hallelujah', cursive;
    font-size: 25px;
    font-weight: 500
}

.col-name {
    color: rgba(156, 129, 153);
    font-weight: 600
}

#shownTerm {
    font-size: x-large
}

.button2 {
    border: solid;
    border-radius: 10%;
    border-color: white;
    background-color: rgb(85, 107, 47);
    font-family: 'Gloria Hallelujah', cursive;
    color: white;
    width: 80%;
    margin-top: 10%;
}

.button1 {
    border: solid;
    border-radius: 50%;
    border-color: white;
    background-color: rgba(156, 129, 153);
    font-family: 'Gloria Hallelujah', cursive;
    color: white;
    margin-top: 10%;
}

button:hover {
    background-color: rgb(85, 107, 47);
    border-color: white;
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
    filter: url(#marker-shape);
    left: -0.25em;
    top: 0.1em;
    padding: 0 0.25em;
    z-index: -1;
}


#card {
    background-color: rgb(85, 107, 47);
    border-radius: 2%;
}

.card-header {
    background-color: rgb(85, 107, 47);
}


a.nav-link1 {
    font-size: 30px;
    margin: 0px;
    padding: 0px;
    color: white
}

a.nav-link:hover {
    border: none;
    background-color: transparent;
}
</style>
]