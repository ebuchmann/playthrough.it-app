<template>
    <div class="game-suggestion">
        Suggest... {{ suggestedGame.title }}
        <button @click="suggest">Suggest TMP</button>
        <game-search :game.sync="suggestedGame"></game-search>
        {{ suggestedGame | json }}
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
            };
        },

        components: {
            GameSearch,
        },

        methods: {
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


</style>
