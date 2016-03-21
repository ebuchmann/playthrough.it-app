<template>
    <div class="game-list">

        <table class="game-table">
            <thead>
                <tr>
                    <th @click="changeOrder('status')" :class="{sort: orderBy === 'status'}">
                        <span :class="direction > 0 ? 'asc' : 'desc'"></span>
                    </th>
                    <th v-for="value in possibleDisplay" v-if="collection.display[value]" @click="changeOrder(value)" :class="{sort: orderBy === value}">
                        {{{ value | capitalize }}}
                        <span :class="direction > 0 ? 'asc' : 'desc'"></span>
                    </th>
                </tr>
            </thead>
            <tbody is="game-row" v-for="game in firstFifty | orderBy orderBy direction" :game="game" :display="collection.display" :user_id="collection.user._id" transition="add-game"></tbody>
        </table>
        <span @click="showMore()">Show more...</span>

    </div>
</template>

<script>
    import GameRow from './GameRow';

    export default {
        vuex: {
            getters: {
                collection: ({ collections, route }) => collections.collections.find(collection => collection._id === route.params.collectionId),
                games: ({ items, route }) => items.items.filter(game => game.collectionId === route.params.collectionId),
            },
            actions: {

            },
        },

        data() {
            return {
                orderBy: 'name',
                direction: 1,
                max: 50,
                possibleDisplay: ['name', 'platform', 'genres', 'time', 'date', 'rating', 'deaths'],
            };
        },

        computed: {
            firstFifty() {
                return this.games.slice(0, this.max);
            },
        },

        methods: {
            changeOrder(type) {
                if (this.orderBy === type) this.direction = this.direction * -1;
                else {
                    this.orderBy = type;
                    this.direction = 1;
                }
            },
            showMore() {
                this.max = this.max + 100;
            },
        },

        components: {
            GameRow,
        },

    };
</script>

<style lang="sass">
    @import '../css/includes';

    .game-list {

    }

    .game-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;

        > thead {
            background-color: $blue;
            color: #fff;
            padding: 8px 0;
            border-bottom: 1px solid $blue-dark;

            > tr th {
                padding: .7rem 0;
                border-top: 1px solid #ddd;
                color: #fff;
                cursor: pointer;

                > span {
                    display: none;
                }
            }

            & .sort::after {
                font-family: FontAwesome;
                padding-left: 15px;
            }
            & .asc::after {
                content: $icon-caret-up;
            }
            & .desc::after {
                content: $icon-caret-down;
            }

            >tr th.sort {
                > span {
                    font-family: FontAwesome;
                    display: inline-block;
                }
            }
        }

        > tbody:nth-child(even) {
            > tr {
                background: $gray-lightest;
            }
        }
    }

    .add-game-transition {
        transition: $all-slow;
        opacity: 1;
        border-color: inherit;
    }

    .add-game-enter, .add-game-leave {
        opacity: 0;
        height: 0;
        border-color: $green;
    }

</style>
