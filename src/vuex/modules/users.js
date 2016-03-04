import {
    SET_USER,
    LOG_OUT,
} from '../mutation-types';

export const state = {
    loggedIn: false,
    username: false,
    maxCollections: 3,
};

export const mutations = {

    [SET_USER](username) {
        this.state.username = username;
    },

    [LOG_OUT]() {
        this.state.username = false;
    },

};

export default {
    state,
    mutations,
};
