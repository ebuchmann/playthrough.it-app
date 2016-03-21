import {
    GET_SUGGESTIONS,
} from '../mutation-types';

export const state = {
    newSuggestions: [],
};

export const mutations = {
    [GET_SUGGESTIONS](state, suggestions) {
        state.newSuggestions.push(suggestions);
    },
};

export default {
    state,
    mutations,
};
