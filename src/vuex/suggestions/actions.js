import * as types from 'store/mutation-types';
import suggestions from 'api/suggestions';

export const suggestGame = ({ dispatch, state }, userId, gameId) => new Promise(resolve => {
    suggestions.suggestGame(userId, gameId).then(res => {
        resolve(res);
    });
});

export const getSuggestions = ({ dispatch }, collectionId) => new Promise(resolve => {
    suggestions.getSuggestions(collectionId).then(res => {
        debug(res);
        dispatch(types.GET_SUGGESTIONS, res.data.attributes[0]);
        resolve();
    });
});

export const acceptSuggestion = ({ dispatch }, suggestionId) => new Promise(resolve => {
    suggestions.acceptSuggestion(suggestionId).then(res => {
        debug(res);
        dispatch(types.ADD_GAME, res.data.attributes);
        debug(res.data.attributes.collection);
        dispatch(types.CHANGE_GAME_COUNT, res.data.attributes.collectionId, 1, 0);
        resolve();
    });
});
