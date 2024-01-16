import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePhraseStoreAnimals = defineStore('phrase-store-animals', () => {
  const phrases_animals = ref([ 
    {sentence: "PAUL: Hola! Qué animal quieres comprar?", selected: { "comprar?":["comprar","kúpiť"] }},
    {sentence: "EDO: Quiero comprar un perro."},
    {sentence: "PAUL: Perfecto, pero sabes que por el animal tienes que cuidar?", selected: { "cuidar?":["cuidar","postarať"] }},
    {sentence: "EDO: Y cómo?"},
    {sentence: "PAUL: El animal tienes que nutrir", selected: { "nutrir":["nutrir","kŕmiť"] }},
    {sentence: "EDO: Mis padres dicen que peinar y pasear con animal también.", selected: {"peinar":["peinar","česať"], "pasear":["pasear","prechádzať"]}}
                                      ])
  return { phrases_animals }
});

export const usePhraseStoreSchool = defineStore('phrase-store-school', () => {
  const phrases_school = ref([ 
    {sentence: "PAUL: Hola! Qué color quieres para dibujar?", selected: { "dibujar?":["dibujar","kresliť"] }},
    {sentence: "EDO: No quiero dibujar pero pintar.", selected: { "pintar":["pintar","maľovať"]}},
    {sentence: "EDO: Pero no quieres cubrir de caucho?", selected: { "quieres":["querer","chcieť"], "cubrir":["cubrir","gumovať"]}},
    {sentence: "PAUL: Ella lee, vamos también!", selected: { "lee,":["leer","čítať"]}},
    {sentence: "EDO: Vale, pero maňana quero pintar.", selected: {"encontraremos":["encontrar","stretnúť"]}},
    {sentence: "PAUL: Maňana tenemos que aprender escribir a mano!", selected: {"escribir":["escribir","písať"]}}
                                      ])
  return { phrases_school }
});

export const useSelectedTermsStore = defineStore('phrase-form-store', () => {
  const selected_terms = ref([
    {verb: {"comprar" : ["compro", "compras", "compra", "compramos", "compráis", "compran","ar"]}},
    {verb: {"cuidar" : ["cuido", "cuidas", "cuida", "cuidamos", "cuidáis", "cuidan", "ar"]}},
    {verb: {"nutrir" : ["nutro", "nutres", "nutre", "nutrimos", "nutrís", "nutren", "ir"]}},
    {verb: {"peinar" : ["peino", "peinas", "peina", "peinamos", "peináis", "peinan", "ar"]}},
    {verb: {"querer" : ["quiero", "quieres", "quiere", "queremos", "queréis", "queren", "er"] }},
    {verb: {"cubrir" : ["cubro", "cubres", "cubre", "cubrimos", "cubrís", "cubren", "ir"] }},
    {verb: {"dibujar" : ["dibujo", "dibujas", "dibuja", "dibujamos", "dibujáis", "dibujan", "ar"] }},
    {verb: {"pintar" : ["pinto", "pintas", "pinta", "pintamos", "pintáis", "pintan", "ar"] }},
    {verb: {"leer" : ["leo", "lees", "lee", "leemos", "leéis", "leen", "er"] }},
    {verb: {"pasear" : ["paseo", "paseas", "pasea", "paseamos", "paseáis", "pasean", "ar"] }},
    {verb: {"escribir" : ["escribo", "escribes", "escribe", "escribimos", "escribís", "escriben", "ir"] }}
  ])
  return { selected_terms }
});

export const useGroupFormsStore = defineStore('group-form-store', () => {
  const groups_forms = ref([
    {group: {"ar" : ["-o", "-as", "-a", "-amos", "-áis", "-an"] }},
    {group: {"er" : ["-o", "-es", "-e", "-emos", "-éis", "-en"] }},
    {group: {"ir" : ["-o", "-es", "-e", "-imos", "-ís", "-en"] }},
  ])
  return { groups_forms }
});