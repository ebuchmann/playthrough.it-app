import { pri } from './api-config';

export default {
    // Grabs user if they're logged in
    getCurrentUser() {
        return pri.get('users/current')
        .then(res => res)
        .catch(err => err);
    },

    // Logs you out
    logout() {
        return pri.get('logout')
        .then(res => res)
        .catch(err => err);
    },
};
