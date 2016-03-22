import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { configRouter } from './route-config';
import App from './App';
import numeral from 'numeraljs';
import { getCurrentUser } from 'store/users/actions';

Vue.use(VueRouter);
Vue.use(Vuex);

export const router = new VueRouter({
    history: true,
    linkActiveClass: 'active',
    saveScrollPosition: true,
});

configRouter(router);

window.debug = function (...args) {
    console.log.apply(console, args);
};

// Filters
Vue.filter('date', value => value ? new Date(value).toISOString().slice(0, 10) : null);

Vue.filter('genre', value => {
    if (value) return value.join(' / ');
    return '';
});

Vue.filter('stripSpaces', value => value.replace(/ /g, ''));

Vue.filter('time', {
    read(value) {
        if (value) return numeral(value).format('00:00:00');
        return null;
    },
    write(value) {
        return numeral(value).format('0');
    },
});

// Sets up router sync
import { sync } from 'vuex-router-sync';
import store from 'store/store';
sync(store, router);

getCurrentUser(store).then(() => {
    router.start(App, '#app');
});
