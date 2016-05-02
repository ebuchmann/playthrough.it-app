import { pub, pri } from 'base/api-config';

export default {
    // Adds a game to a collection
    // TODO: swap the api call to call items instead of Collections
    addGame(collectionId, gameId) {
        return pri.post(`collections/${collectionId}/games/${gameId}`);
    },

    // Get a collections items
    getCollectionGames(id) {
        return pub.get(`items/collection/${id}`);
    },

    // Remove a game
    removeGame(id) {
        return pub.delete(`items/${id}`);
    },

    // Updates a game list item
    updateItem(id, attributes) {
        return pri.patch(`items/${id}`, {
            attributes,
        });
    },
};
