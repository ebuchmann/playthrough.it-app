import {
    SET_CURRENT_USER,
    LOG_OUT,
    CHANGE_BANNER,
    UPDATE_USER,
} from '../mutation-types';

export const state = {
    maxCollections: 6,
    banner: '/1500x500.png',
    currentUser: false,
};

export const mutations = {

    [SET_CURRENT_USER](state, user) {
        state.currentUser = user;
    },

    [LOG_OUT](state) {
        state.currentUser = false;
    },

    [CHANGE_BANNER](state, newBanner) {
        state.banner = newBanner;
    },

    [UPDATE_USER](state, user) {
        state.currentUser = user;
    },

};

export default {
    state,
    mutations,
};
