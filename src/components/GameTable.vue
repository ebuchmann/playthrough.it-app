<template>
    <div class="game-list">
        <template v-if="games.length">
            <table class="game-table">
                <thead>
                    <tr>
                        <th v-for="value in possibleDisplay" v-if="collection.display[value.display] || value.visible" @click="changeOrder(value.filter)" :class="{ sort: orderBy === value.filter }">
                            {{{ value.display | capitalize }}}
                            <span :class="direction > 0 ? 'asc' : 'desc'"></span>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody is="game-row" v-for="game in firstFifty | orderBy orderBy direction | filterBy customFilter" :game="game" :display="collection.display" :user_id="collection.user._id" transition="add-game"></tbody>
            </table>
            <span @click="showMore()">Show more...</span>
        </template>
        <div v-else>
            <div class="no-games">
                <p class="message">This collection is empty, <a v-link="{ name: 'addGames' }">add some games!</a></p>
            </div>
        </div>
    </div>
</template>

<script>
    import GameRow from './GameRow';

    export default {
        props: ['filter'],

        vuex: {
            getters: {
                collection: ({ collections, route }) => collections.collections.find(collection => collection._id === route.params.collectionId),
                games: ({ items, route }) => items.items.filter(game => game.challenge === route.params.collectionId),
            },
            actions: {

            },
        },

        data() {
            return {
                orderBy: 'game.title',
                direction: 1,
                max: 50,
                possibleDisplay: [
                    { filter: 'status', display: null, visible: true },
                    { filter: 'game.title', display: 'title', visible: true },
                    { filter: 'game.platform', display: 'platform' },
                    { filter: 'game.genres', display: 'genres' },
                    { filter: 'time', display: 'time' },
                    { filter: 'completed_on', display: 'date' },
                    { filter: 'rating', display: 'rating' },
                    { filter: 'deaths', display: 'deaths' },
                ],
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
            customFilter(item) {
                switch (this.filter) {
                case 'Finished': return item.status === 'Finished';
                case 'Unfinished': return item.status !== 'Finished';
                default: return item;
                }
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
        box-shadow: $light-shadow;

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
                font-weight: normal;

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
                    margin-left: 10px;
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
        transition: $all-medium;
        opacity: 1;
        border-color: inherit;
    }

    .add-game-enter, .add-game-leave {
        opacity: 0;
        height: 0;
        border-color: $green;
    }

    .no-games {
        width: 100%;
        border: 1px solid $gray-light;
        padding: 40px;
        border-radius: 4px;
        display: table;
        background-color: $gray-lighter;

        > .message {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            font-size: 1.5rem;
        }
    }

</style>
