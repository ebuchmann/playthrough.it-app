import * as types from 'store/mutation-types';

export const changeBanner = ({ dispatch }, newBanner) => {
    dispatch(types.CHANGE_BANNER, newBanner);
};
