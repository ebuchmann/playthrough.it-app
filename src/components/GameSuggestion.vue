<template>
    <div class="game-suggestion">
        <div class="top">
            <i class="fa fa-comments-o"></i>
        </div>
        <div class="btn" @click="openSuggestion">
            Suggest a game
        </div>
        <div :class="['suggestion-area', { opened: suggesting }]">
            <p>Woah, suggestions!</p>
        </div>
        <div class="right">
            Suggest... {{ suggestedGame.title }}
            <game-search :game.sync="suggestedGame"></game-search>
            <button @click="suggest">Suggest TMP</button>
            {{ suggestedGame | json }}
        </div>
    </div>
</template>

<script>
    import { suggestGame } from 'store/suggestions/actions';
    import GameSearch from 'component/GameSearch';

    export default {
        props: ['collection'],

        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                suggestGame,
            },
        },

        data() {
            return {
                suggestedGame: '',
                suggesting: false,
            };
        },

        components: {
            GameSearch,
        },

        methods: {
            openSuggestion() {
                this.suggesting = !this.suggesting;
            },

            suggest() {
                if (this.suggestedGame) {
                    this.suggestGame({
                        suggestedTo: this.collection.user._id,
                        game: this.suggestedGame._id,
                        collection: this.collection._id,
                    });
                }
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .game-suggestion {
        box-shadow: $light-shadow;
        position: relative;

        > .top {
            padding: 30px 60px;
            background: $blue;
            box-shadow: $light-shadow;
            border-bottom: 3px solid $blue-dark;

            > .fa {
                font-size: 4rem;
                color: #fff;
                border: 2px solid #fff;
                border-radius: 50%;
                padding: 20px;
            }
        }

        > .btn {
            background-color: #fff;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: $all-fast;

            &:hover {
                background-color: $gray-lighter;
            }
        }

        > .right {
            display: none;
        }
    }

    .suggestion-area {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        transition: $all-fast;
        left: 0;
        opacity: 0;
        width: 0;
        height: 100%;

        &.opened {
            background-color: $red;
            left: 244px;
            opacity: 1;
            width: 400px;
        }
    }


</style>
