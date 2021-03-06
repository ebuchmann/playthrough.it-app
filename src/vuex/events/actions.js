import * as types from 'store/mutation-types';

export const sendEvent = ({ dispatch, state }, { message, type }) => {
    dispatch(types.SEND_EVENT, { message, type });
};

export const clearEvent = ({ dispatch }, messageId, debounce) => {
    setTimeout(() => {
        dispatch(types.CLEAR_EVENT, messageId);
    }, debounce);
};
