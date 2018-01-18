import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Dashboard from '../components/Dashboard'
import Vault from '../components/Vault'
import Keep from '../components/Keep'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/vaults',
      name: 'Vaults',
      component: Vault
    },
    {
      path: '/keeps',
      name: 'Keeps',
      component: Keep
    }
  ]
})
