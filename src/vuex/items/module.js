import {
    GET_GAME_LIST,
    UPDATE_ITEM,
    ADD_GAME,
    REMOVE_GAME,
} from '../mutation-types';
// import Vue from 'vue';

export const state = {
    items: [],
};

export const mutations = {
    [GET_GAME_LIST](state, games) {
        state.items = games.slice();
    },

    [UPDATE_ITEM](state, listItem) {
        delete listItem.game;
        const foundGame = state.items.find(item => item._id === listItem._id);
        for (const key in listItem) {
            if (listItem.hasOwnProperty(key)) {
                state.items[state.items.indexOf(foundGame)][key] = listItem[key];
            }
        }
    },

    [ADD_GAME](state, game) {
        state.items.push(game);
    },

    [REMOVE_GAME](state, gameId) {
        const foundGame = state.items.find(game => game._id === gameId);
        if (foundGame) {
            state.items.splice(state.items.indexOf(foundGame), 1);
        }
    },
};

export default {
    state,
    mutations,
};
