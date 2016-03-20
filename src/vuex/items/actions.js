import * as types from 'store/mutation-types';
import items from 'api/items';

export const addGame = ({ dispatch }, collectionId, gameId) => {
    items.addGame(collectionId, gameId).then(res => {
        dispatch(types.ADD_GAME, res.data.attributes);
        dispatch(types.CHANGE_GAME_COUNT, collectionId, 1, 0);
    });
};

export const getCollectionGames = ({ dispatch }, collectionId) => new Promise(resolve => {
    items.getCollectionGames(collectionId).then(res => {
        dispatch(types.GET_GAME_LIST, res.data.attributes);
        resolve();
    });
});

export const removeGame = ({ dispatch }, gameId, collectionId, wasFinished) => {
    items.removeGame(gameId).then(() => {
        dispatch(types.REMOVE_GAME, gameId);
        dispatch(types.CHANGE_GAME_COUNT, collectionId, -1, wasFinished);
    });
};

export const updateItem = ({ dispatch }, itemId, property) => new Promise((resolve, reject) => {
    items.updateItem(itemId, property).then(res => {
        dispatch(types.UPDATE_COLLECTION, res.data.attributes.collection);
        dispatch(types.UPDATE_ITEM, res.data.attributes.item);
        setTimeout(() => {
            resolve();
        }, 800);
    }).catch(err => {
        reject(err);
    });
});
