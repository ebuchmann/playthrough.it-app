import {
    SEND_EVENT,
    CLEAR_EVENT,
} from '../mutation-types';

export const state = {
    events: [],
};

export const mutations = {
    [SEND_EVENT](state, event) {
        event.id = state.events.length + 1;
        event.new = true;
        state.events.push(event);
    },
    [CLEAR_EVENT](state, messageId) {
        const message = state.events.find(event => event.id === messageId);
        message.new = false;
    },
};

export default {
    state,
    mutations,
};
