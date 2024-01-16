import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Exercise {
  term: string;
  translTerm: string;
  userInputTerm: string;
}

export const useExerciseStore = defineStore('exercise-store', () => {
  const exercise_store = ref<Exercise[]>([ 
    {term: "dog", translTerm: "perro", userInputTerm: ""},
    {term: "cat", translTerm: "gato", userInputTerm: ""},
    {term: "frog", translTerm: "rana", userInputTerm: ""},
    {term: "cow", translTerm: "vaca", userInputTerm: ""},
    {term: "panda", translTerm: "panda", userInputTerm: ""},
    {term: "bird", translTerm: "pajaro", userInputTerm: ""},
  ]);

    function setUserInputTerm (payload: { term: string; userInputTerm: string }) {
      const { term, userInputTerm } = payload;
      const exercise = exercise_store.value.find((e) => e.term === term);
      if (exercise) {
        exercise.userInputTerm = userInputTerm;
      }
  };
  
  return {
    exercise_store,
    setUserInputTerm
  };
});


