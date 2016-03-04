<template>
    <span class="game-search">

        <input v-model="game"
            @click="open"
            @keyup.down="moveSelected(1)"
            @keyup.up="moveSelected(-1)"
            @keyup="doSearch"
            @keyup.enter="addGame2" />

        <ul class="search-list" v-show="opened">
            <li v-for="game in list"
                class="{{$index === selected ? 'selected' : ''}}"
                @mouseover="selected = $index"
                @click="addGame2">
                {{ game.name }}
                <template v-if="filter.type === '*'"> - {{ game.platform_id }}</template>
            </li>
        </ul>

    </span>
</template>

<script>
    import { addGame } from '../vuex/actions';

    export default {
        data() {
            return {
                game: '',
                list: [],
                selected: 0,
                opened: false,
            };
        },

        vuex: {
            state: {
                possible: store => store.games.possible,
                filter: store => store.games.currentFilter,
            },
            actions: {
                addGame,
            },
        },

        methods: {
            addGame2() {
                if (this.list.length) {
                    this.addGame(this.list[this.selected]);
                    this.list = [];
                    this.game = '';
                    this.opened = false;
                }
            },

            doSearch(event) {
                if (event.keyCode > 40 || event.keyCode < 37) {
                    if (this.game.length > 0) {
                        this.list = this.possible.filter(game => {
                            const reg = new RegExp(`^${this.game}`, 'i');
                            return this.filter.type === '*' ? game.name.match(reg) : game.name.match(reg) && game.platform_id === this.filter.type;
                        }
                        );
                        this.selected = 0;
                        this.opened = true;
                    } else {
                        this.list = [];
                        this.opened = false;
                    }
                }
            },

            moveSelected(number) {
                const total = this.list.length - 1;

                if (this.selected === 0 && number === -1) {
                    this.selected = total;
                } else if (this.selected === total && number === 1) {
                    this.selected = 0;
                } else {
                    this.selected = this.selected + number;
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
    @import '../css/variables';

    .game-search {
        position: relative;
        display: inline-block;

        > input {
            border: none;
            border-bottom: 2px solid #222;
            width: 500px;
            font-size: 3rem;
            color: $blue-dark;
            line-height: 1.3;
            transition: $all-fast;

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
        font-size: 2rem;
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
