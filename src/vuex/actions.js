import * as types from './mutation-types';

// Users module
export const setUser = types.SET_USER;
export const logOut = types.LOG_OUT;

// Games module
export const setStatus = ({ dispatch }, gameId, status) => {
    dispatch(types.SET_STATUS, gameId, status);
};

export const setTime = ({ dispatch }, gameId, time) => {
    dispatch(types.SET_TIME, gameId, time);
};

export const changeFilter = ({ dispatch }, filterId) => {
    dispatch(types.CHANGE_FILTER, filterId);
};

export const addGame = ({ dispatch }, game) => {
    dispatch(types.ADD_GAME, game);
};
