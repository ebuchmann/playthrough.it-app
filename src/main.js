import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App';

Vue.use(VueRouter);
Vue.use(Vuex);

export const router = new VueRouter({
    history: true,
    linkActiveClass: 'active',
});

// Page Components
import Home from './components/pages/Home';
import PublicCollections from './components/pages/PublicCollections';
import CollectionSingle from './components/pages/CollectionSingle';
import Profile from './components/pages/Profile';
import NotFound from './components/pages/NotFound';

router.map({
    '/': {
        name: 'home',
        component: Home,
    },
    '/collections': {
        name: 'collections',
        component: PublicCollections,
    },
    '/collection/:collection_id': {
        name: 'single_collection',
        component: CollectionSingle,
    },
    '/profile': {
        name: 'profile',
        component: Profile,
    },
    '*': {
        component: NotFound,
    },
});

window.debug = function (...args) {
    console.log.apply(console, args);
};

// Filters
Vue.filter('date', value => value ? new Date(value).toISOString().slice(0, 10) : null);

Vue.filter('genre', value => value.join(' / '));

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

router.start(App, '#app');
