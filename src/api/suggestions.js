import { pri } from './api-config';

export default {
    // Create new collection
    suggestGame(userId, gameId) {
        return pri.post(`suggestions/${userId}/${gameId}`)
        .then(res => res)
        .catch(err => err);
    },

    // Gets a collections suggested games
    getSuggestions(collectionId) {
        return pri.get(`suggestions/${collectionId}`)
        .then(res => res)
        .catch(err => err);
    },

    // Accepts a suggestion
    acceptSuggestion(suggestionId) {
        return pri.post(`suggestions/${suggestionId}/accept`)
        .then(res => res)
        .catch(err => err);
    },
};