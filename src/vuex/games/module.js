import {
    CHANGE_FILTER,
    GAME_SEARCH,
    CLEAR_SEARCH,
} from '../mutation-types';

export const state = {
    currentFilter: {
        name: 'Any platform',
        type: '*',
    },
    allFilters: [
        { name: 'Any platform', type: '*' },
        { name: '3DO', type: '3D0' },
        { name: 'Amiga', type: 'AMI' },
        { name: 'Arcade', type: 'ARC' },
        { name: 'Atari 2600', type: '2600' },
        { name: 'Atari 5200', type: '5200' },
        { name: 'Atari 7800', type: '7800' },
        { name: 'Atari 8-bit', type: 'A800' },
        { name: 'Atari Lynx', type: 'LYNX' },
        { name: 'Atari ST', type: 'AST' },
        { name: 'CD-i', type: 'CDI' },
        { name: 'ColecoVision', type: 'CVIS' },
        { name: 'Commodore 64', type: 'C64' },
        { name: 'Dreamcast', type: 'DC' },
        { name: 'Famicom Disk System', type: 'FDS' },
        { name: 'GameCube', type: 'GCN' },
        { name: 'Game Boy', type: 'GB' },
        { name: 'Game Boy Advance', type: 'GBA' },
        { name: 'Game Boy Color', type: 'GBC' },
        { name: 'Game Gear', type: 'GG' },
        { name: 'Genesis', type: 'GEN' },
        { name: 'Jaguar', type: 'JAG' },
        { name: 'NEC PC-8801', type: 'PC88' },
        { name: 'NEC PC-9801', type: 'PC98' },
        { name: 'NEC PC-6001', type: '6001' },
        { name: 'Neo Geo', type: 'NEO' },
        { name: 'Neo Geo CD', type: 'NGCD' },
        { name: 'Nintendo 3DS', type: '3DS' },
        { name: 'Nintendo 64', type: 'N64' },
        { name: 'Nintendo DS', type: 'DS' },
        { name: 'Nintendo Entertainment System', type: 'NES' },
        { name: 'PC', type: 'PC' },
        { name: 'PlayStation', type: 'PS1' },
        { name: 'PlayStation 2', type: 'PS2' },
        { name: 'PlayStation 3', type: 'PS3' },
        { name: 'PlayStation 4', type: 'PS4' },
        { name: 'PlayStation Portable', type: 'PSP' },
        { name: 'PlayStation Vita', type: 'VITA' },
        { name: 'Saturn', type: 'SAT' },
        { name: 'Sega Master System', type: 'SMS' },
        { name: 'Sega SG-1000', type: 'SG1K' },
        { name: 'Super Nintendo Entertainment System', type: 'SNES' },
        { name: 'Sega CD', type: 'SCD' },
        { name: 'Sega 32X', type: '32X' },
        { name: 'TurboGrafx-16', type: 'TG16' },
        { name: 'TurboGrafx-CD', type: 'TGCD' },
        { name: 'Virtual Boy', type: 'VBOY' },
        { name: 'Wii', type: 'Wii' },
        { name: 'Wii U', type: 'WIIU' },
        { name: 'WonderSwan', type: 'WSW' },
        { name: 'WonderSwan Color', type: 'WSC' },
        { name: 'Xbox', type: 'XBOX' },
        { name: 'Xbox 360', type: 'X360' },
        { name: 'Xbox One', type: 'XONE' },
        { name: 'ZX Spectrum', type: 'SPEC' },
    ],
    results: [],
};

export const mutations = {
    [CHANGE_FILTER](state, type) {
        state.currentFilter = state.allFilters.find(item => item.type === type);
    },

    [GAME_SEARCH](state, games) {
        state.results = games;
    },

    [CLEAR_SEARCH](state) {
        state.results = [];
    },
};

export default {
    state,
    mutations,
};
