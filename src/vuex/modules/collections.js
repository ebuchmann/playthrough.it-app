import Vue from 'vue';
import {
    ADD_COLLECTION,
    ADD_GAME,
    SET_STATUS,
    SET_TITLE,
    TOGGLE_PROPERTY,
    UPDATE_TRACKING,
} from '../mutation-types';
import { master } from './mock/masterquest';

export const state = {
    'kg-34': {
        id: 'kg-34',
        title: 'The Master Quest',
        games: 293,
        completed: 131,
        current: 'Ultima 4, SMS',
        owner: 'ebuchmann',
        gameList: master,
        start_date: 'Sat Aug 16 2014 00:00:00 GMT-0700 (Pacific Daylight Time)',
        status: 'Opened',
        private: 'Public',
        addGames: false,
        tracking: {
            platform_id: {
                active: true,
                value: 'Platform',
            },
            genres: {
                active: true,
                value: 'Genres',
            },
            time: {
                active: true,
                value: 'Time',
            },
            date: {
                active: true,
                value: 'Date',
            },
            rating: {
                active: true,
                value: 'Rating',
            },
            deaths: {
                active: false,
                value: 'Deaths',
            },
        },
    },
    'ge-34': {
        id: 'ge-34',
        title: 'Gameboy Colorama',
        games: 548,
        completed: 14,
        current: 'Resident Evil, GBC',
        owner: 'ebuchmann',
        start_date: 'Mon Nov 03 2014 00:00:00 GMT-0800 (Pacific Daylight Time)',
        status: 'Opened',
        private: 'Public',
        addGames: true,
        gameList: [
            { id: 10, name: 'Bad Dudes', platform_id: 'NES', genres: ['Beat \'em Up'], completed_on: '', time: '', status: 'Unfinished' },
            { id: 11, name: 'Sonic the Hedgehog', platform_id: 'SMS', genres: ['Platformer'], completed_on: '', time: '', status: 'Unfinished' },
            { id: 12, name: 'NBA Jam TE', platform_id: 'GEN', genres: ['Sports'], completed_on: '', time: '', status: 'Unfinished' },
            { id: 13, name: 'Terminator 2', platform_id: 'SMS', genres: ['Action'], completed_on: '', time: '', status: 'Unfinished' },
            { id: 14, name: 'Ghost House', platform_id: 'SMS', genres: ['Action'], completed_on: '', time: '', status: 'Unfinished' },
            { id: 15, name: 'Bionic Commando', platform_id: 'NES', genres: ['Action'], completed_on: '', time: '', status: 'Unfinished' },
            { id: 16, name: 'I\'m Kid Dracula', platform_id: 'NES', genres: ['Action', 'Platformer'], completed_on: '', time: '', status: 'Unfinished' },
            { id: 17, name: 'Phantasy Star', platform_id: 'SMS', genres: ['Role Playing'], completed_on: '', time: '', status: 'Unfinished' },
        ],
        tracking: {
            platform_id: {
                active: true,
                value: 'Platform',
            },
            genres: {
                active: true,
                value: 'Genres',
            },
            time: {
                active: true,
                value: 'Time',
            },
            date: {
                active: true,
                value: 'Date',
            },
            rating: {
                active: false,
                value: 'Rating',
            },
            deaths: {
                active: false,
                value: 'Deaths',
            },
        },
    },
};

export const mutations = {
    [ADD_COLLECTION](state, title) {
        const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        Vue.set(state, newId, {
            id: newId,
            title,
            games: 0,
            completed: 0,
            current: '',
            owner: 'ebuchmann',
            state_date: new Date(),
            status: 'Opened',
            private: 'Public',
            addGames: true,
            gameList: [],
            tracking: {
                platform_id: {
                    active: true,
                    value: 'Platform',
                },
                genres: {
                    active: true,
                    value: 'Genres',
                },
                time: {
                    active: true,
                    value: 'Time',
                },
                date: {
                    active: true,
                    value: 'Date',
                },
                rating: {
                    active: false,
                    value: 'Rating',
                },
                deaths: {
                    active: false,
                    value: 'Deaths',
                },
            },
        });
    },

    [ADD_GAME](state, game, collectionId) {
        Vue.set(game, 'status', 'Unfinished');
        Vue.set(game, 'completed_on', '');
        Vue.set(game, 'time', '');
        state[collectionId].gameList.unshift(game);
    },

    [SET_STATUS](state, collectionId, gameId, status) {
        const foundGame = state[collectionId].gameList.find(game => game.id === gameId);
        if (foundGame) {
            foundGame.status = status;
            if (!foundGame.completed_on && status === 'Finished') foundGame.completed_on = new Date();
        }
    },

    [SET_TITLE](state, collectionId, newTitle) {
        state[collectionId].title = newTitle;
    },

    [TOGGLE_PROPERTY](state, collectionId, property) {
        state[collectionId][property] = !state[collectionId][property];
    },

    [UPDATE_TRACKING](state, changes) {
        changes.forEach(change => {
            change.active = !change.active;
        });
    },
};

export default {
    state,
    mutations,
};
