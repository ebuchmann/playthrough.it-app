import {
    SET_USER,
    LOG_OUT
} from '../mutation-types'

export const state = {
    loggedIn: false,
    username: false,
    maxCollections: 3
}

export const mutations = {

    [SET_USER] (state, username) {
        state.user.username = username
    },

    [LOG_OUT] (state) {
        state.user.username = false
    }

}

export default {
    state,
    mutations
}
