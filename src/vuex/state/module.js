import {
    SET_STATE,
} from '../mutation-types';

export const state = {
    loginModal: false,
    collectionModal: false,
};

export const mutations = {
    [SET_STATE](state, property, status) {
        state[property] = status;
    },
};

export default {
    state,
    mutations,
};
