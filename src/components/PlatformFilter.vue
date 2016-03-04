<template>
    <span class="platform-filter {{opened ? 'opened' : ''}}">
        <span class="current" @click="open">
            {{ currentFilter.name }}
        </span>
        <ul class="filters {{opened ? 'opened' : ''}}">
            <li class="item {{filter.name === currentFilter.name ? 'selected' : ''}}"
                v-for="filter in allFilters"
                @click="changeFilter($index)">
                {{ filter.name }}
            </li>
        </ul>
    </span>
</template>

<script>
    import { changeFilter } from '../vuex/actions';

    export default {
        data() {
            return {
                opened: false,
            };
        },

        vuex: {
            state: {
                allFilters: store => store.games.allFilters,
                currentFilter: store => store.games.currentFilter,
            },
            actions: {
                changeFilter,
            },
        },

        methods: {
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

    .platform-filter {
        position: relative;
        border-bottom: 2px solid #222;
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
                font-size: 2rem;
            }
        }

        > .filters {
            position: absolute;
            left: 0;
            font-size: 1.5rem;
            list-style: none;
            text-align: left;
            background-color: #fff;
            border: 1px solid #eceeef;
            width: 100%;
            padding: 0;
            z-index: 101;

            max-height:0;
            overflow:hidden;
            -webkit-transform:perspective(400) rotate3d(1,0,0,-90deg);
            -webkit-transform-origin:50% 0;
            -webkit-transition:350ms;
            -moz-transition:350ms;
            -o-transition:350ms;
            transition:350ms;

            &.opened {
                max-height:1000px;
                -webkit-transform:perspective(400) rotate3d(0,0,0,0);
            }

            > .item {
                padding: 5px 10px;
                cursor: pointer;

                &.selected {
                    background: $blue-highlight;
                }

                &:hover {
                    background-color: $green-highlight;
                }
            }
        }
    }

</style>
