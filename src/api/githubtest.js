import { pri } from './api-config';

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
