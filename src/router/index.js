import Vue from 'vue'
import Router from 'vue-router'

import BCbond from '../components/BCbond'
import BStock from '../components/BStock'
import BForum from '../components/BForum'
import BTrader from '../components/BTrader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cbond',
      name: 'cbond',
      component: BCbond
    },{
      path: '/stock',
      name: 'stock',
      component: BStock
    },{
      path: '/forum',
      name: 'forum',
      component: BForum
    },{
      path: '/trader',
      name: 'trader',
      component: BTrader
    }
  ]
})
