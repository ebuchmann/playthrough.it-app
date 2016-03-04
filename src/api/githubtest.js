import { pri } from './api';

export default {
    getUser() {
        return new Promise((resolve) => {
            pri.get('users/ebuchmann')
                .then(res => {
                    resolve(res);
                });
        });
    },
};
