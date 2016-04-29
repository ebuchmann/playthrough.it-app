import { pri } from './api-config';

export default {
    // Updates your user info
    updateUser(attributes) {
        const options = {
            transformRequest(formData) { return formData; },
        };
        return pri.post('users/update', attributes, options);
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
