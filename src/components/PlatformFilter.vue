<template>
    <div class="platform-filter">
        {{ opened }}
        <input type="text" v-model="filter" v-el:input
            @focus="open()"
            @blur="close()"
        />
        <ul :class="['filtered-list', { opened: opened}]">
            <li class="item" v-for="item in filteredList" @mousedown.prevent="selectFilter(item)">{{ item.name }}</li>
        </ul>

        {{ currentFilter | json }}
    </div>
</template>

<script>
    import { changeFilter } from 'store/games/actions';

    export default {
        data() {
            return {
                opened: false,
                index: 0,
                filter: '',
            };
        },

        vuex: {
            getters: {
                allFilters: state => state.games.allFilters,
                currentFilter: state => state.games.currentFilter,
            },
            actions: {
                changeFilter,
            },
        },

        computed: {
            filteredList() {
                return this.allFilters.filter(item => item.name.match(new RegExp(this.filter, 'i')));
            },
        },

        methods: {
            selectFilter(item) {
                this.changeFilter(item);
                this.close();
            },

            open() {
                this.opened = true;
            },

            close() {
                if (this.opened) {
                    this.opened = false;
                    this.$els.input.blur();
                }
            },

            test() {
                debug('test');
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .platform-filter {
        position: relative;
        border-bottom: 2px solid $blue-dark;
        transition: $all-fast;

        &.opened {
            border-bottom: 2px solid $blue;
        }

        > .current {
            cursor: pointer;
            color: #06637c;

            &::after {
                content: '\F0D7';
                font-family: FontAwesome;
                padding-left: 5px;
                right: 0;
                position: absolute;
            }
        }
    }

    .filtered-list {
        margin-top: 2px;
        background-color: #fff;
        border: 1px solid #eceeef;
        border-bottom: 2px solid $blue;
        width: 100%;
        z-index: 101;
        min-width: 340px;
        display: none;
        overflow: hidden;
        position: absolute;
        overflow-y: scroll;
        overflow-x: hidden;
        font-size: 1.15rem;
        list-style: none;
        padding: 0;
        max-height: 240px;

        &.opened {
            display: block;
        }

        > .item {
            padding: 5px 10px;
            cursor: pointer;

            &.selected, &:hover {
                background: $blue-highlight;
            }
        }
    }

</style>
