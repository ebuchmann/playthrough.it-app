import * as types from 'store/mutation-types';
import collections from './api';

export const addCollection = ({ dispatch }, title) => new Promise((resolve, reject) => {
    if (title) {
        collections.createCollection(title).then(res => {
            if (res.status === 201) {
                dispatch(types.ADD_COLLECTION, res.data.attributes);
                resolve();
            } else {
                reject(res.data);
            }
        });
    }
});

export const getAllCollections = ({ dispatch }) => {
    collections.getCollections().then(res => {
        dispatch(types.GET_ALL_COLLECTIONS, res.data.attributes);
    });
};

export const getUsersCollections = ({ dispatch }, userId) => new Promise(resolve => {
    collections.getUsersCollections(userId).then(res => {
        dispatch(types.GET_ALL_COLLECTIONS, res.data.attributes);
        resolve();
    });
});

export const getCollection = ({ dispatch }, collectionId) => new Promise(resolve => {
    collections.getCollection(collectionId).then(res => {
        dispatch(types.GET_COLLECTION, res.data.attributes);
        resolve();
    });
});

export const updateCollection = ({ dispatch }, collectionId, property) => new Promise(resolve => {
    collections.updateCollection(collectionId, property).then(res => {
        dispatch(types.UPDATE_COLLECTION, res.data.attributes.collection);
        resolve();
    });
});

export const removeChallenge = ({ dispatch }, challengeId) => new Promise(resolve => {
    collections.removeChallenge(challengeId).then(() => {
        dispatch(types.REMOVE_CHALLENGE, challengeId);
        dispatch(types.SEND_EVENT, { type: 'success', message: 'Challenge removed.' });
        resolve();
    });
});
