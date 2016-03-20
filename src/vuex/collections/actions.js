import * as types from 'store/mutation-types';
import collections from 'api/collection';

export const addCollection = ({ dispatch }, title) => {
    if (title) {
        collections.createCollection(title).then(res => {
            dispatch(types.ADD_COLLECTION, res.data.attributes);
        });
        return true;
    }
    return false;
};

export const getAllCollections = ({ dispatch }) => {
    collections.getCollections().then(res => {
        dispatch(types.GET_ALL_COLLECTIONS, res.data.attributes);
    });
};

export const getCollection = ({ dispatch }, collectionId) => new Promise(resolve => {
    collections.getCollection(collectionId).then(res => {
        dispatch(types.GET_COLLECTION, res.data.attributes);
        resolve();
    });
});

export const updateCollection = ({ dispatch }, collectionId, property) => {
    collections.updateCollection(collectionId, property).then(res => {
        dispatch(types.UPDATE_COLLECTION, res.data.attributes.collection);
    });
};
