<template>
    <div class="collection-single">

        <profile-banner></profile-banner>

        <div class="container">
            <h1 class="title">{{ collection.title }}</h1>

            <game-list-add></game-list-add>
            <game-table></game-table>
        </div>

    </div>
</template>

<script>
    import GameTable from '../GameTable';
    import GameListAdd from '../GameListAdd';
    import ProfileBanner from '../ProfileBanner';

    export default {

        vuex: {
            state: {
                collection(state) {
                    return state.collections.collections.find(collection => collection.id === parseInt(this.$route.params.collection_id, 10));
                },
            },
            actions: {

            },
        },

        components: {
            GameTable,
            GameListAdd,
            ProfileBanner,
        },

    };
</script>

<style lang="sass">
    @import '../../css/variables';

    .collection-single {

        .title {
            &::before {
                content: '';
                display: block;
                border: 2px solid $green;
                width: 120px;
                margin-top: 25px;
            }
        }
    }

</style>
