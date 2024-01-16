import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/navigation',
      name: 'navigation',
      components: {
        a: () => import('../views/NavigationView.vue')
      }
    },
    {
      path: '/:topic/:topicID',
      name: 'vocabulary',
      components: {
        a: () => import('../views/VocabularyView.vue')
      }
    },
    {
      path: '/:topic/:topicID',
      name: 'conversation',
      components: {
        a: () => import('../views/PhraseView.vue')
      },
    },
    {
      path: '/:topic/:topicID',
      name: 'exercise',
      components: {
        a: () => import('../views/ExerciseView.vue')
      },
    }, 
    {
      path: '/',
      name: '',
      components: {
        a: () => import('../views/SignView.vue'),
      }
      },
    
  ]
})
export default router