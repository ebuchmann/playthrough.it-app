<template>
    <div class="game-list">

        <table class="game-table">
            <thead>
                <tr>
                    <th @click="changeOrder('status')" :class="{sort: orderBy === 'status'}">
                        <span :class="direction > 0 ? 'asc' : 'desc'"></span>
                    </th>
                    <th @click="changeOrder('name')" :class="{sort: orderBy === 'name'}">
                        Name
                        <span :class="direction > 0 ? 'asc' : 'desc'"></span>
                    </th>
                    <th v-for="(key, track) in selectedTracking" v-if="track.active" @click="changeOrder(key)" :class="{sort: orderBy === key}">
                        {{{ track.value }}}
                        <span :class="direction > 0 ? 'asc' : 'desc'"></span>
                    </th>
                </tr>
            </thead>
            <tbody is="game-row" v-for="game in firstFifty | orderBy orderBy direction" :game="game" :tracking="selectedTracking" transition="add-game"></tbody>
        </table>
        <span @click="showMore()">Show more...</span>

    </div>
</template>

<script>
    import GameRow from './GameRow';

    export default {
        vuex: {
            getters: {
                selectedCollection: state => state.collections.collections.find(collection => collection._id === state.route.params.collection_id),
                games: ({ gameList, route }) => gameList.gameLists.filter(game => game.collection_id === route.params.collection_id),
            },
            actions: {

            },
        },

        data() {
            return {
                orderBy: 'name',
                direction: 1,
                max: 50,
            };
        },

        computed: {
            selectedTracking() {
                return this.selectedCollection.tracking;
            },
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
