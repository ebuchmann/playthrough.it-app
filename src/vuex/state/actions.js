import * as types from 'store/mutation-types';

export const setState = ({ dispatch }, property, value) => {
    dispatch(types.SET_STATE, property, value);
};
