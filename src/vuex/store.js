import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import games from './modules/games'
import collections from './modules/collections'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        users,
        games,
        collections
    },
    strict: debug,
    middlewares: debug ? [Vuex.createLogger()] : []
})
