import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { configRouter } from './route-config';
import App from './App';

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
        if (value) {
            const newValue = new Date(value);
            return `${newValue.getHours()}:${newValue.getMinutes()}:${newValue.getSeconds()}`;
        }
        return null;
    },
    write(value) {
        const time = value.split(':');
        return new Date(0, 0, 0, time[0], time[1], time[2]);
    },
});

// Sets up router sync
import { sync } from 'vuex-router-sync';
import store from 'store/store';
sync(store, router);

router.start(App, '#app');
