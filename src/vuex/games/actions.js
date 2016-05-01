import * as types from 'store/mutation-types';
import games from 'api/games';

export const changeFilter = ({ dispatch }, type) => {
    dispatch(types.CHANGE_FILTER, type);
};

export const gameSearch = ({ state, dispatch }, query) => {
    games.gameSearch(query, state.games.currentFilter.type).then(res => {
        dispatch(types.GAME_SEARCH, res.data.results);
    });
};

export const clearSearch = ({ dispatch }) => {
    dispatch(types.CLEAR_SEARCH);
};
