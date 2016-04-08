import { pub, pri } from './api-config';

export default {
    // Create new collection
    createCollection(title) {
        return pri.post('collections', {
            attributes: {
                title,
            },
        });
    },

    // Get all collections
    getCollections() {
        return pub.get('collections');
    },

    // Get collections for a specific user
    getUsersCollections(userId) {
        return pub.get(`collections/user/${userId}`);
    },

    // Get a single collection
    getCollection(id) {
        return pub.get(`collections/${id}`);
    },

    // Updates a collection
    updateCollection(id, attributes) {
        return pub.patch(`collections/${id}`, {
            attributes,
        });
    },

    // Removes a challenge
    removeChallenge(id) {
        return pri.delete(`challenges/${id}`);
    },
};
