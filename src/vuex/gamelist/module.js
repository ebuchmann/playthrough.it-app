import {
    GET_GAME_LIST,
    SET_STATUS,
    ADD_GAME,
    REMOVE_GAME,
} from '../mutation-types';
// import Vue from 'vue';

export const state = {
    gameLists: [],
};

export const mutations = {
    [GET_GAME_LIST](state, games) {
        state.gameLists = games.slice();
    },

    [SET_STATUS](state, listItem) {
        delete listItem.game;
        const foundGame = state.gameLists.find(item => item._id === listItem._id);
        for (const key in listItem) {
            if (listItem.hasOwnProperty(key)) {
                state.gameLists[state.gameLists.indexOf(foundGame)][key] = listItem[key];
            }
        }
    },

    [ADD_GAME](state, game) {
        state.gameLists.push(game);
    },

    [REMOVE_GAME](state, gameId) {
        const foundGame = state.gameLists.find(game => game._id === gameId);
        if (foundGame) {
            state.gameLists.splice(state.gameLists.indexOf(foundGame), 1);
        }
    },
};

export default {
    state,
    mutations,
};
