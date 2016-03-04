import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import store from './vuex/store'

Vue.use(VueRouter)
Vue.use(Vuex)

export const router = new VueRouter({
    history: true,
    linkActiveClass: 'active'
})

// Page Components
import Home from './components/pages/Home'
import PublicCollections from './components/pages/PublicCollections'
import CollectionSingle from './components/pages/CollectionSingle'
import Profile from './components/pages/Profile'
import NotFound from './components/pages/NotFound'

router.map({
    '/': {
        name: 'home',
        component: Home
    },
    '/collections': {
        name: 'collections',
        component: PublicCollections
    },
    '/collection/:collection_id': {
        name: 'single_collection',
        component: CollectionSingle
    },
    '/profile': {
        name: 'profile',
        component: Profile
    },
    '*': {
        component: NotFound
    }
})

window.debug = function () {
    console.log.apply(console, arguments)
}

// Filters
Vue.filter('date', function (value) {
    return value
    ? new Date(value).toISOString().slice(0, 10)
    : null
})

Vue.filter('genre', function (value) {
    return value.join(' / ')
})

Vue.filter('stripSpaces', function (value) {
    return value.replace(/ /g, '')
})

Vue.filter('time', {
    read (value) {
        if (value) {
            value = new Date(value)
            return `${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`
        }
    },
    write (value, oldValue) {
        const time = value.split(':')
        return new Date(0, 0, 0, time[0], time[1], time[2])
    }
})

router.start(App, '#app')
