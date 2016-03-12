import {
    SET_USER,
    LOG_OUT,
    CHANGE_BANNER,
} from '../mutation-types';

export const state = {
    loggedIn: false,
    username: false,
    maxCollections: 5,
    banner: '/1500x500.png',
};

export const mutations = {

    [SET_USER](username) {
        this.state.username = username;
    },

    [LOG_OUT]() {
        this.state.username = false;
    },

    [CHANGE_BANNER](state, newBanner) {
        state.banner = newBanner;
    },

};

export default {
    state,
    mutations,
};
