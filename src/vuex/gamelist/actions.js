import * as types from 'store/mutation-types';
import gamelists from 'api/gamelists';

export const setStatus = ({ dispatch }, gameId, status) => {
    gamelists.setStatus(gameId, status).then(res => {
        debug(res);
        debug('update col');
        dispatch(types.UPDATE_COLLECTION, res.data.attributes.collection);
        dispatch(types.SET_STATUS, res.data.attributes.gameList);
    });
};

export const addGame = ({ dispatch }, collectionId, gameId) => {
    gamelists.addGame(collectionId, gameId).then(res => {
        dispatch(types.ADD_GAME, res.data.attributes);
        dispatch(types.CHANGE_GAME_COUNT, collectionId, 1, 0);
    });
};

export const getCollectionGames = ({ dispatch }, collectionId) => new Promise(resolve => {
    gamelists.getCollectionGames(collectionId).then(res => {
        dispatch(types.GET_GAME_LIST, res.data.attributes);
        resolve();
    });
});

export const removeGame = ({ dispatch }, gameId, collectionId, wasFinished) => {
    gamelists.removeGame(gameId).then(() => {
        dispatch(types.REMOVE_GAME, gameId);
        dispatch(types.CHANGE_GAME_COUNT, collectionId, -1, wasFinished);
    });
};
