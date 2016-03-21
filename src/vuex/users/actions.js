import * as types from 'store/mutation-types';
import users from 'api/users';

export const changeBanner = ({ dispatch }, newBanner) => {
    dispatch(types.CHANGE_BANNER, newBanner);
};

export const getCurrentUser = ({ dispatch }) => new Promise(resolve => {
    users.getCurrentUser().then(({ data }) => {
        dispatch(types.SET_CURRENT_USER, data);
        resolve();
    });
});

export const logout = ({ dispatch }) => {
    users.logout().then(() => {
        dispatch(types.LOG_OUT);
    });
};
