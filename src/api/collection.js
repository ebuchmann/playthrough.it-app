import { pub } from './api-config';

export default {
    // Create new collection
    createCollection(title) {
        return pub.post('collections', {
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

    // Get a single collection
    getCollection(id) {
        return pub.get(`collections/${id}`)
        .then(res => res)
        .catch(err => err);
    },
};
