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

export const setTitle = ({ dispatch }, collectionId, newTitle) => {
    if (newTitle) {
        dispatch(types.SET_TITLE, collectionId, newTitle);
    }
};

export const toggleProperty = ({ dispatch }, collectionId, property) => {
    dispatch(types.TOGGLE_PROPERTY, collectionId, property);
};

export const updateTracking = ({ dispatch }, changes) => {
    dispatch(types.UPDATE_TRACKING, changes);
};
