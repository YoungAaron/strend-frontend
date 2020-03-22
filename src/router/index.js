import Vue from 'vue'
import Router from 'vue-router'

import BCbond from '../components/BCbond'
import BStock from '../components/BStock'
import BForum from '../components/BForum'
import BTrader from '../components/BTrader'
import Tbuyback from '../components/Tbuyback.vue'
import Temployee from '../components/Temployee.vue'
import Tfinance from '../components/Tfinance.vue'
import Tfund from '../components/Tfund.vue'
import Toverweight from '../components/Toverweight.vue'

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
      component: BTrader,
      children: [ 
        {
          path: 'overweight',
          name: 'overweight',
          component: Toverweight
        },{
          path: 'buyback',
          name: 'buyback',
          component: Tbuyback
        },{
          path: 'employee',
          name: 'employee',
          component: Temployee
        },{
          path: 'finance',
          name: 'finance',
          component: Tfinance
        },{
          path: 'fund',
          name: 'fund',
          component: Tfund
        }
      ]
    }
  ]
})
