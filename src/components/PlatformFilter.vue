<template>
    <span class="platform-filter {{opened ? 'opened' : ''}}">
        <span class="current" @click="open">
            {{ currentFilter.name }}
        </span>
        <div class="filter-list {{opened ? 'opened' : ''}}">
            <input class="filterinput" type="text" v-el:input v-model="filter"placeholder="Search" @click.prevent.stop />
            <ul class="filters">
                <li class="item {{filter.name === currentFilter.name ? 'selected' : ''}}"
                v-for="filter in filteredList"
                @click="changeFilter(filter.type)">
                {{ filter.name }}
            </li>
        </ul>
        </div>
    </span>
</template>

<script>
    import { changeFilter } from 'store/games/actions';

    export default {
        data() {
            return {
                opened: false,
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
            open() {
                setTimeout(() => {
                    this.opened = true;
                    this.$els.input.focus();
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
                font-size: 1.75rem;
            }
        }
    }

    .filter-list {
        max-height:0;
        overflow:hidden;
        position: absolute;
        left: 0;
        background-color: #fff;
        border: 1px solid #eceeef;
        border-bottom: 2px solid $blue;
        width: 100%;
        z-index: 101;
        min-width: 340px;
        overflow: scroll;
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

        > .filters {
            font-size: 1.35rem;
            list-style: none;
            text-align: left;
            padding: 0;

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

        > .filterinput {
            width: 100%;
            border: none;
            border-bottom: 1px solid $gray;
            font-size: 1.35rem;
            padding: 0 10px;

            &:focus {
                outline: none;
            }
        }
    }

</style>
