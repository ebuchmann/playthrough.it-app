import {
    ADD_COLLECTION,
    UPDATE_COLLECTION,
    GET_ALL_COLLECTIONS,
    GET_COLLECTION,
    CHANGE_GAME_COUNT,
    REMOVE_CHALLENGE,
} from '../mutation-types';

export const state = {
    collections: [],
};

export const mutations = {
    [ADD_COLLECTION](state, collection) {
        state.collections.push(collection);
    },

    [GET_ALL_COLLECTIONS](state, collections) {
        state.collections = collections;
    },

    [GET_COLLECTION](state, newCollection) {
        const match = state.collections.find(collection => collection._id === newCollection._id);
        if (match) {
            state.collections.splice(state.collections.indexOf(match), 1);
        }
        state.collections.push(newCollection);
    },

    [CHANGE_GAME_COUNT](state, collectionId, change, finished) {
        const collection = state.collections.find(collection => collection._id === collectionId);
        collection.games = collection.games + change;
        collection.completed = collection.completed + finished;
    },

    [UPDATE_COLLECTION](state, collection) {
        delete collection.user;
        const foundCollection = state.collections.find(col => col._id === collection._id);
        if (foundCollection) {
            const index = state.collections.indexOf(foundCollection);
            for (const key in collection) {
                if (foundCollection.hasOwnProperty(key)) {
                    state.collections[index][key] = collection[key];
                }
            }
        }
    },

    [REMOVE_CHALLENGE](state, challengeId) {
        const foundChallenge = state.collections.find(chal => chal._id === challengeId);
        if (foundChallenge) {
            state.collections.splice(state.collections.indexOf(foundChallenge), 1);
        }
    },
};

export default {
    state,
    mutations,
};
