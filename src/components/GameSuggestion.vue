<template>
    <div class="game-suggestion">
        Suggest...
        <button @click="suggest">Suggest TMP</button>
    </div>
</template>

<script>
    import { suggestGame } from 'store/suggestions/actions';

    export default {
        props: ['user_id'],

        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                suggestGame,
            },
        },

        methods: {
            suggest() {
                this.suggestGame(this.user_id, '56e49d24c136a5f08b73662e');
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';


</style>
