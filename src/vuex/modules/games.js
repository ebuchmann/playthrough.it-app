import Vue from 'vue';
import {
    SET_STATUS,
    SET_TIME,
    ADD_GAME,
    CHANGE_FILTER,
} from '../mutation-types';

export const state = {
    current: [
        { id: 1, name: 'Alf', status: 'Finished', platform_id: 'SMS', genres: ['Adventure'], completed_on: 'Thu Oct 16 2014 00:00:00 GMT-0700 (Pacific Daylight Time)', time: 'Thu Oct 16 2014 02:35:52 GMT-0700 (Pacific Daylight Time)' },
        { id: 2, name: 'Secret Command', status: 'Finished', platform_id: 'SMS', genres: ['Action', "Shoot em' up"], completed_on: 'Tue Oct 21 2014 00:00:00 GMT-0700 (Pacific Daylight Time)', time: '' },
        { id: 3, name: 'Master of Darkness', status: 'Finished', platform_id: 'SMS', genres: ['Platformer', 'Adventure'], completed_on: 'Thu Oct 23 2014 00:00:00 GMT-0700 (Pacific Daylight Time)', time: '' },
        { id: 4, name: 'Wonder Boy in Monster Land', status: 'Finished', platform_id: 'SMS', genres: ['Action', 'Platformer'], completed_on: 'Tue Nov 11 2014 00:00:00 GMT-0800 (Pacific Standard Time)', time: '' },
        { id: 5, name: 'After Burner', status: 'Abandoned', platform_id: 'SMS', genres: ['Action', 'Flight Sim'], completed_on: '', time: '' },
        { id: 6, name: "Zoda's Revenge: Star Tropics 2", status: 'Unfinished', platform_id: 'NES', genres: ['Action'], completed_on: '', time: '' },
    ],
    possible: [
        { id: 7, name: 'Star Tropics', platform_id: 'NES', genres: ['Action', 'Platformer'] },
        { id: 8, name: 'Final Fantasy', platform_id: 'NES', genres: ['Role Playing'] },
        { id: 9, name: 'Bart vs. the Space Mutants', platform_id: 'SMS', genres: ['Platformer'] },
        { id: 10, name: 'Bad Dudes', platform_id: 'NES', genres: ['Beat \'em Up'] },
        { id: 11, name: 'Sonic the Hedgehog', platform_id: 'SMS', genres: ['Platformer'] },
        { id: 12, name: 'NBA Jam TE', platform_id: 'GEN', genres: ['Sports'] },
        { id: 13, name: 'Terminator 2', platform_id: 'SMS', genres: ['Action'] },
        { id: 14, name: 'Ghost House', platform_id: 'SMS', genres: ['Action'] },
        { id: 15, name: 'Bionic Commando', platform_id: 'NES', genres: ['Action'] },
        { id: 16, name: 'I\'m Kid Dracula', platform_id: 'NES', genres: ['Action', 'Platformer'] },
        { id: 17, name: 'Phantasy Star', platform_id: 'SMS', genres: ['Role Playing'] },
        { id: 18, name: 'Final Fight', platform_id: 'SNES', genres: ['Beat \'em Up'] },
        { id: 19, name: 'Fester\'s Quest', platform_id: 'NES', genres: ['Adventure'] },
        { id: 20, name: 'Family Feud', platform_id: 'NES', genres: ['Adventure'] },
        { id: 21, name: 'Family Trainer: Athletic World', platform_id: 'NES', genres: ['Adventure'] },
        { id: 22, name: 'Felix the Cat', platform_id: 'NES', genres: ['Adventure'] },
        { id: 23, name: 'Final Combat', platform_id: 'NES', genres: ['Adventure'] },
        { id: 24, name: 'Final Fantasy II', platform_id: 'NES', genres: ['Adventure'] },
        { id: 25, name: 'Front Mission', platform_id: 'SNES', genres: ['Adventure'] },
        { id: 26, name: 'Full Power', platform_id: 'SNES', genres: ['Adventure'] },
        { id: 27, name: 'Full Throttle All-American Racing', platform_id: 'SNES', genres: ['Adventure'] },
    ],
    currentFilter: {
        name: 'Any platform',
        type: '*',
    },
    allFilters: [
        {
            name: 'Any platform',
            type: '*',
        },
        {
            name: 'SMS',
            type: 'SMS',
        },
        {
            name: 'NES',
            type: 'NES',
        },
        {
            name: 'SNES',
            type: 'SNES',
        },
    ],
};

export const mutations = {

    [SET_STATUS](state, gameId, status) {
        const foundGame = state.current.find(game => game.id === gameId);
        if (foundGame) {
            foundGame.status = status;
            if (!foundGame.completed_on && status === 'Finished') foundGame.completed_on = new Date();
        }
    },

    [ADD_GAME](state, game) {
        Vue.set(game, 'status', 'Unfinished');
        Vue.set(game, 'completed_on', '');
        Vue.set(game, 'time', '');
        state.current.unshift(game);
    },

    [CHANGE_FILTER](state, filter) {
        state.currentFilter = state.allFilters[filter];
    },

    [SET_TIME](state, gameId, time) {
        const foundGame = state.current.find(game => game.id === gameId);

        if (foundGame && !!time.getTime()) {
            foundGame.time = time;
        }
    },

};

export default {
    state,
    mutations,
};
