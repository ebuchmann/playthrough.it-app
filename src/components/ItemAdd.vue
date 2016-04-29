<template>
    <div class="game-list-add">

        <p class="text">
            I want to add&nbsp;<game-search :action="doAddGame"></game-search>&nbsp;on&nbsp;<platform-filter></platform-filter>
        </p>

    </div>
</template>

<script>
    import GameSearch from 'component/GameSearch';
    import PlatformFilter from 'component/PlatformFilter';
    import { addGame } from 'store/items/actions';
    import { sendEvent } from 'store/events/actions';

    export default {
        vuex: {
            actions: {
                addGame,
                sendEvent,
            },
            getters: {
                collectionId: ({ route }) => route.params.collectionId,
            },
        },

        methods: {
            doAddGame(game) {
                this.addGame(this.collectionId, game._id);
                this.sendEvent({ type: 'success', message: `${game.title} added!` });
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

        > .text {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 0;

            > .input {
                border: none;
                border-bottom: 2px solid black;
            }
        }
    }

</style>
