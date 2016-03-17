import * as types from 'store/mutation-types';
import games from 'api/games';

export const changeFilter = ({ dispatch }, filterId) => {
    dispatch(types.CHANGE_FILTER, filterId);
};

export const gameSearch = ({ state, dispatch }, query) => {
    games.gameSearch(query, state.games.currentFilter.type).then(res => {
        dispatch(types.GAME_SEARCH, res.data.results);
    });
};
