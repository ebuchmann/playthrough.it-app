import {
    CHANGE_FILTER,
    GAME_SEARCH,
} from '../mutation-types';

export const state = {
    currentFilter: {
        name: 'Any platform',
        type: '*',
    },
    allFilters: [
        { name: 'Any platform', type: '*' },
        { name: 'SMS', type: 'SMS' },
        { name: 'NES', type: 'NES' },
        { name: 'SNES', type: 'SNES' },
    ],
    results: [],
};

export const mutations = {
    [CHANGE_FILTER](state, filter) {
        state.currentFilter = state.allFilters[filter];
    },

    [GAME_SEARCH](state, games) {
        state.results = games;
    },
};

export default {
    state,
    mutations,
};
