import * as types from './mutation-types';

// Users module
export const setUser = types.SET_USER;
export const logOut = types.LOG_OUT;

export const changeBanner = ({ dispatch }, newBanner) => {
    dispatch(types.CHANGE_BANNER, newBanner);
};

// Games module
export const setTime = ({ dispatch }, gameId, time) => {
    dispatch(types.SET_TIME, gameId, time);
};

export const changeFilter = ({ dispatch }, filterId) => {
    dispatch(types.CHANGE_FILTER, filterId);
};

// Collections module

export const addCollection = ({ dispatch }, title) => {
    if (title) {
        dispatch(types.ADD_COLLECTION, title);
        return true;
    }
    return false;
};

export const addGame = ({ dispatch }, game, collectionId) => {
    dispatch(types.ADD_GAME, game, collectionId);
};

export const setStatus = ({ dispatch }, collectionId, gameId, status) => {
    dispatch(types.SET_STATUS, collectionId, gameId, status);
};

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
