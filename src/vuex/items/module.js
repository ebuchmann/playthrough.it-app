import {
    GET_GAME_LIST,
    UPDATE_ITEM,
    ADD_GAME,
    REMOVE_GAME,
} from '../mutation-types';

export const state = {
    items: [],
};

export const mutations = {
    [GET_GAME_LIST](state, games) {
        state.items = games.slice();
    },

    [UPDATE_ITEM](state, listItem) {
        const foundGame = state.items.find(item => item._id === listItem._id);
        delete listItem.game;
        const index = state.items.indexOf(foundGame);
        // state.items.$set(index, listItem);
        // vm.$set(state.items[index], listItem);
        // foundGame.set('deaths', 300);
        // foundGame = Object.assign({}, listItem);
        for (const key in listItem) {
            if (listItem.hasOwnProperty(key)) {
                state.items[index][key] = listItem[key];
            }
        }
    },

    [ADD_GAME](state, game) {
        state.items.push(game);
    },

    [REMOVE_GAME](state, gameId) {
        const foundGame = state.items.find(game => game._id === gameId);
        if (foundGame) state.items.$remove(foundGame);
    },
};

export default {
    state,
    mutations,
};
