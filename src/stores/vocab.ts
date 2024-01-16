import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useColorStore = defineStore('color-store', () => {
  const color_store = ref([ 
    {img: "pen.png", text: "pen2.png"},
    {img: "pencil.png", text: "pencil2.png"},
    {img: "book.png", text: "book2.png"},
    {img: "exercise_book.png", text: "exercise_book2.png"},
    {img: "highlighter.png", text: "highlighter2.png"},
    {img: "rubber.png", text: "rubber2.png"},
   ])
  return { color_store }
});

export const useAnimalStore = defineStore('animal-store', () => {
  const animalStore = ref([ 
    { img: "dog.png", text: "dog2.png" },
    { img: "cat.png", text: "cat2.png" },
    { img: "frog.png", text: "frog2.png" },
    { img: "cow.png", text: "cow2.png" },
    { img: "bird.png", text: "bird2.png" },
    { img: "panda.png", text: "panda2.png" },
  ]);
  return { animalStore };
});