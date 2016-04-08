import { pri } from './api-config';

export default {
    // Updates your user info
    updateUser(attributes) {
        return pri.patch('users/update', { attributes });
    },

    // Grabs user if they're logged in
    getCurrentUser() {
        return pri.get('users/current');
    },

    // Logs you out
    logout() {
        return pri.get('logout');
    },
};
