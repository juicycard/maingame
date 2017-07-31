import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import NewGame from '@/components/NewGame'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/new-game',
      name: 'NewGame',
      component: NewGame
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    }
  ]
})
