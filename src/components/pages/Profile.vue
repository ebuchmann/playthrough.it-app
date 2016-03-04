<template>
    <div class="user-profile">

        <profile-banner></profile-banner>

        <div class="container">
            <span class="collection-count">2 of 3 collections</span>

            <button @click="addCollection">Add new collection</button>
            <add-collection></add-collection>

            <div class="row">
                <template v-for="collection in collections">
                    <div class="col-3">
                        <collection-card :collection="collection"></collection-card>
                    </div>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
    import ProfileBanner from '../ProfileBanner'
    import CollectionCard from '../CollectionCard'
    import AddCollection from '../AddCollection'

    export default {
        vuex: {
            state: {
                collections: store => store.collections.collections
            },
            actions: {

            }
        },

        methods: {
            addCollection () {
                this.$broadcast('addCollection::open-modal')
            }
        },

        components: {
            ProfileBanner,
            CollectionCard,
            AddCollection
        }
    }
</script>

<style lang="sass">
    @import '../../css/variables';

    .collection-count {
        float: right;
    }
</style>
