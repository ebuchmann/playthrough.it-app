import * as types from './mutation-types'

// Users module
export const setUser = types.SET_USER
export const logOut = types.LOG_OUT

// Games module
export const setStatus = ({ dispatch }, game_id, status) => {
    dispatch(types.SET_STATUS, game_id, status)
}

export const setTime = ({ dispatch }, game_id, time) => {
    dispatch(types.SET_TIME, game_id, time)
}

export const changeFilter = ({ dispatch }, filter_id) => {
    dispatch(types.CHANGE_FILTER, filter_id)
}

export const addGame = ({ dispatch }, game) => {
    dispatch(types.ADD_GAME, game)
}
