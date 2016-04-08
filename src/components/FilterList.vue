<template>
    <div class="filter-list">
        <h3 class="sub-title">Filter by...</h3>
        <ul class="filter-links">
            <li @click="setFilter('')" :class="{ selected : filter === ''}">All <span>{{ games.length }}</span></li>
            <li @click="setFilter('Finished')" :class="{ selected : filter === 'Finished'}">Finished <span>{{ finishedCount }}</span></li>
            <li @click="setFilter('Unfinished')" :class="{ selected : filter === 'Unfinished'}">Unfinished <span>{{ unfinishedCount }}</span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['filter'],

        vuex: {
            getters: {
                games: ({ items, route }) => items.items.filter(game => game.challenge === route.params.collectionId),
            },
        },

        methods: {
            setFilter(type) {
                this.filter = type;
            },
        },

        computed: {
            finishedCount() {
                return this.games.filter(game => game.status === 'Finished').length;
            },
            unfinishedCount() {
                return this.games.length - this.finishedCount;
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .filter-list {
    }

    .filter-links {
        list-style: none;
        padding: 0;

        > li {
            display: block;
            padding: 10px 0 10px 20px;
            cursor: pointer;
            border-left: 3px solid transparent;
            transition: $all-fast;

            &:hover {
                border-left: 3px solid $gray-light;
            }

            &.selected {
                background: $gray-lighter;
                border-left: 3px solid $blue;
            }

            > span {
                float: right;
                margin-right: 20px;
                text-align: center;
                font-size: .8rem;
            }
        }
    }

</style>
