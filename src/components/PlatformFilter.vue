<template>
    <div class="platform-filter {{opened ? 'opened' : ''}}" @click.stop>
        <div class="current" @click="open">
            {{ currentFilter.name }}
        </div>
        <div class="filtered-list {{opened ? 'opened' : ''}}">
            <input class="filterinput" type="text" v-el:input v-model="filter"placeholder="Type to search..." />
            <ul class="filters">
                <li class="item {{filter.name === currentFilter.name ? 'selected' : ''}}"
                v-for="filter in filteredList"
                @click="selectItem(filter.type)">
                {{ filter.name }}
            </li>
        </ul>
        </div>
    </div>
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
                this.opened = true;
                this.$nextTick(() => {
                    this.$els.input.focus();
                });
            },

            selectItem(item) {
                this.changeFilter(item);
                this.opened = false;
                this.filter = '';
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

        &.opened {
            max-height:280px;
            display: inherit;
        }

        > .filters {
            position: relative;
            overflow-y: scroll;
            overflow-x: hidden;
            font-size: 1.15rem;
            list-style: none;
            text-align: left;
            padding: 0;
            max-height: 240px;

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
            margin: 0 15px;
            border: none;
            border-bottom: 1px solid $gray;
            font-size: 1.35rem;
            position: relative;

            &:focus {
                outline: none;
            }
        }
    }

</style>
