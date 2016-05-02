import { pub } from 'base/api-config';

export default {
    // Create new collection
    gameSearch(query, filter) {
        return pub.post('games/search', {
            attributes: {
                query,
                filter,
            },
        });
    },
};
