import * as types from 'store/mutation-types';
import suggestions from 'api/suggestions';

export const suggestGame = ({ dispatch, state }, suggestion) => new Promise(resolve => {
    suggestions.suggestGame(suggestion).then(res => {
        resolve(res);
    });
});

export const getSuggestions = ({ dispatch }, collectionId) => new Promise(resolve => {
    suggestions.getSuggestions(collectionId).then(res => {
        if (res.data.attributes.length) dispatch(types.GET_SUGGESTIONS, res.data.attributes);
        resolve();
    });
});

export const acceptSuggestion = ({ dispatch }, suggestionId) => new Promise(resolve => {
    suggestions.acceptSuggestion(suggestionId).then(res => {
        dispatch(types.ADD_GAME, res.data.attributes);
        dispatch(types.CHANGE_GAME_COUNT, res.data.attributes.collectionId, 1, 0);
        resolve();
    });
});
