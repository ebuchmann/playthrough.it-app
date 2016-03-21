import { pub } from './api-config';

export default {
    // Adds a game to a collection
    // TODO: swap the api call to call items instead of Collections
    addGame(collectionId, gameId) {
        return pub.post(`collections/${collectionId}/games/${gameId}`);
    },

    // Get a collections items
    getCollectionGames(id) {
        return pub.get(`items/collection/${id}`)
        .then(res => res)
        .catch(err => err);
    },

    // Remove a game
    removeGame(id) {
        return pub.delete(`items/${id}`)
        .then(res => res)
        .catch(err => err);
    },

    // Updates a game list item
    updateItem(id, attributes) {
        return pub.patch(`items/${id}`, {
            attributes,
        })
        .then(res => res)
        .catch(err => err);
    },
};