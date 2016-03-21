<template>
    <div class="suggested-games">
        {{ suggestion.suggestedBy.username }} suggested -> {{ suggestion.game.title }} -> <span @click="acceptSuggestion(suggestion._id)">Add it?</span> or <span>Ignore it?</span>
    </div>
</template>

<script>
    import { acceptSuggestion } from 'store/suggestions/actions';

    export default {
        props: ['suggestion'],

        vuex: {
            actions: {
                acceptSuggestion,
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';


</style>
