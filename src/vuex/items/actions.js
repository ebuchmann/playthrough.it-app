import * as types from 'store/mutation-types';
import items from 'api/items';

export const addGame = ({ dispatch }, collectionId, gameId) => new Promise((resolve, reject) => {
    items.addGame(collectionId, gameId).then(res => {
        dispatch(types.ADD_GAME, res.data.attributes);
        dispatch(types.CHANGE_GAME_COUNT, collectionId, 1, 0);
        resolve(res.data.attributes);
    }).catch(({ data }) => {
        dispatch(types.SEND_EVENT, { message: data.error, type: 'error' });
        reject(data);
    });
});

export const getCollectionGames = ({ dispatch }, collectionId) => new Promise(resolve => {
    items.getCollectionGames(collectionId).then(res => {
        dispatch(types.GET_GAME_LIST, res.data.attributes);
        resolve();
    });
});

export const removeGame = ({ dispatch }, game) => new Promise(resolve => {
    items.removeGame(game._id).then(() => {
        dispatch(types.REMOVE_GAME, game._id);
        dispatch(types.CHANGE_GAME_COUNT, game.challenge, -1, game.status === 'Finished' ? -1 : 0);
        resolve();
    });
});

export const updateItem = ({ dispatch }, itemId, property) => new Promise((resolve, reject) => {
    items.updateItem(itemId, property).then(res => {
        dispatch(types.UPDATE_COLLECTION, res.data.attributes.collection);
        dispatch(types.UPDATE_ITEM, res.data.attributes.item);
        resolve();
    }).catch(err => {
        reject(err);
    });
});
