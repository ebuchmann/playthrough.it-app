<template>
    <span class="game-search">

        <input v-model="text"
            placeholder="Type to search..."
            @click="open"
            @keyup.down="moveSelected(1)"
            @keyup.up="moveSelected(-1)"
            @keyup="doSearch | debounce 500"
            @keyup.enter="doAddGame" />

        <ul class="search-list" v-show="opened">
            <li v-for="game in boldList"
                class="{{$index === selected ? 'selected' : ''}}"
                @mouseover="selected = $index"
                @click="doAddGame">
                {{{ game.title }}}
                <template v-if="filter.type === '*'"> - {{ game.platform }}</template>
            </li>
        </ul>

    </span>
</template>

<script>
    import { gameSearch, clearSearch } from 'store/games/actions';

    export default {
        props: ['game', 'action'],

        data() {
            return {
                text: '',
                selected: 0,
                opened: false,
            };
        },

        vuex: {
            getters: {
                possible: ({ games }) => games.possible,
                filter: ({ games }) => games.currentFilter,
                list: ({ games }) => games.results,
            },
            actions: {
                gameSearch,
                clearSearch,
            },
        },

        computed: {
            boldList() {
                return this.list.map(item => {
                    const match = this.text.length
                        ? item.title.replace(new RegExp(`(^|)(${this.text})(|$)`, 'i'), '$1<strong>$2</strong>$3')
                        : item.title;
                    return {
                        _id: item._id,
                        platform: item.platform,
                        title: match,
                    };
                });
            },
        },

        methods: {
            doAddGame() {
                if (this.list.length) {
                    this.action(this.list[this.selected]);
                    this.text = '';
                    this.clearSearch();
                }
            },

            doSearch(event) {
                if (event.keyCode > 40 || event.keyCode < 37 && event.keyCode !== 13) {
                    if (this.text.length > 0) {
                        this.gameSearch(this.text);
                        this.selected = 0;
                        this.opened = true;
                    } else {
                        this.opened = false;
                    }
                }
            },

            moveSelected(number) {
                if (this.list.length) {
                    const total = this.list.length - 1;

                    if (this.selected === 0 && number === -1) {
                        this.selected = total;
                    } else if (this.selected === total && number === 1) {
                        this.selected = 0;
                    } else {
                        this.selected = this.selected + number;
                    }

                    this.text = this.list[this.selected].title;
                }
            },

            open() {
                setTimeout(() => {
                    this.opened = true;
                }, 15);
            },
        },

        events: {
            'hide::dropdown'() {
                if (this.opened) this.opened = false;
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .game-search {
        position: relative;
        display: inline-block;

        > input {
            border: none;
            border-bottom: 2px solid $blue-dark;
            width: 500px;
            font-size: 1.5rem;
            color: $blue-dark;
            line-height: 2rem;
            transition: $all-fast;
            padding-bottom: 1px;

            &:focus, &:active {
                border-bottom: 2px solid $blue;
                outline: none;
            }
        }
    }

    .search-list {
        position: absolute;
        background: #fff;
        border: gray;
        list-style: none;
        font-size: 1.65rem;
        width: 100%;
        text-align: left;
        margin: 0;
        padding: 0;
        z-index: 102;
        cursor: pointer;

        > li {
            padding: 0 10px;
            border-bottom: 1px solid $gray-light;
        }

        > .selected {
            background: $blue-highlight;
        }
    }

</style>
