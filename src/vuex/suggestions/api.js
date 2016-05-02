import { pri } from 'base/api-config';

export default {
    // Create new collection
    suggestGame(attributes) {
        return pri.post('suggestions', { attributes });
    },

    // Gets a collections suggested games
    getSuggestions(collectionId) {
        return pri.get(`suggestions/${collectionId}`);
    },

    // Accepts a suggestion
    acceptSuggestion(suggestionId) {
        return pri.post(`suggestions/${suggestionId}/accept`);
    },
};
