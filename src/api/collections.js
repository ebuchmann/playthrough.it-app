import { pub, pri } from './api-config';

export default {
    // Create new collection
    createCollection(title) {
        return pri.post('collections', {
            attributes: {
                title,
            },
        })
        .then(res => res)
        .catch(err => err);
    },

    // Get all collections
    getCollections() {
        return pub.get('collections')
        .then(res => res)
        .catch(err => err);
    },

    // Get collections for a specific user
    getUsersCollections(userId) {
        return pub.get(`collections/user/${userId}`)
        .then(res => res)
        .catch(err => err);
    },

    // Get a single collection
    getCollection(id) {
        return pub.get(`collections/${id}`)
        .then(res => res)
        .catch(err => err);
    },

    // Updates a collection
    updateCollection(id, attributes) {
        return pub.patch(`collections/${id}`, {
            attributes,
        })
        .then(res => res)
        .catch(err => err);
    },
};
