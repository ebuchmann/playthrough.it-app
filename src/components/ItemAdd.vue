<template>
    <div class="game-list-add">
        <div class="row">
            <div class="leftside">
                <label>Game search</label>
                <game-search :action="doAddGame"></game-search>

                <div class="recent-area" v-if="recent.length">
                    <p>Recently added games...</p>
                    <ul class="recent-list">
                        <li v-for="item in recent" class="item">
                            <i class="fa fa-plus"></i> {{ item.game.title }} - <span class="undo" @click="doRemoveGame(item)"><i class="fa fa-trash"></i> undo</span>
                         </li>
                    </ul>
                </div>

            </div>
            <div class="rightside">
                <label>Filters</label>
                <platform-filter></platform-filter>
            </div>
        </div>

    </div>
</template>

<script>
    import GameSearch from 'component/GameSearch';
    import PlatformFilter from 'component/PlatformFilter';
    import { addGame, removeGame } from 'store/items/actions';
    import { sendEvent } from 'store/events/actions';

    export default {
        vuex: {
            actions: {
                addGame,
                sendEvent,
                removeGame,
            },
            getters: {
                collectionId: ({ route }) => route.params.collectionId,
            },
        },

        data() {
            return {
                recent: [],
            };
        },

        methods: {
            doAddGame(game) {
                this.addGame(this.collectionId, game._id).then(game => {
                    if (this.recent.length >= 5) this.recent.pop();
                    this.recent.unshift(game);
                });
            },

            doRemoveGame(game) {
                this.removeGame(game).then(() => {
                    this.recent.$remove(game);
                });
            },
        },

        components: {
            GameSearch,
            PlatformFilter,
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .game-list-add {
        background: #fff;
        box-shadow: $light-shadow;
        margin: 25px 0;
        padding: 20px;
        border-bottom: 3px solid $blue;
        position: relative;

        > .row > .leftside {
            @include span(8 of 12);
        }

        > .row > .rightside {
            @include span(4 of 12 last);
        }
    }

    .recent-list {
        list-style: none;

        > .item {
            > .undo {
                cursor: pointer;
                color: $gray-light;
            }
        }
    }

</style>
