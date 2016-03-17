import { pub } from './api-config';

export default {
    // Create new collection
    setStatus(id, status) {
        return pub.patch(`gameLists/${id}`, {
            attributes: {
                status,
            },
        })
        .then(res => res)
        .catch(err => err);
    },

    // Adds a game to a collection
    addGame(collectionId, gameId) {
        return pub.post(`collections/${collectionId}/games/${gameId}`);
    },

    // Get a collections gameList
    getCollectionGames(id) {
        return pub.get(`collections/${id}/games`)
        .then(res => res)
        .catch(err => err);
    },

    // Remove a game
    removeGame(id) {
        return pub.delete(`gameLists/${id}`)
        .then(res => res)
        .catch(err => err);
    },
};
