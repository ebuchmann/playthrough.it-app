import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger';

import users from 'store/users/module';
import games from 'store/games/module';
import collections from 'store/collections/module';
import items from 'store/items/module';
import suggestions from 'store/suggestions/module';

Vue.use(Vuex);
Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        users,
        games,
        collections,
        items,
        suggestions,
    },
    strict: debug,
    middlewares: [createLogger()],
});
