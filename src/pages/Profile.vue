<template>
    <div class="user-profile">

        <profile-banner></profile-banner>

        <div class="container">
            <span class="collection-count">{{ collectionCount }} of {{ maxCollections }} collections</span>

            <div class="row">
                <template v-for="collection in collections">
                    <div class="col-3">
                        <collection-card :collection="collection"></collection-card>
                    </div>
                </template>
                <div v-if="collectionCount < maxCollections" class="col-3">
                    <create-collection></create-collection>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ProfileBanner from 'component/ProfileBanner';
    import CollectionCard from 'component/CollectionCard';
    import CreateCollection from 'component/CreateCollection';

    import { getAllCollections } from 'store/collections/actions';

    export default {
        vuex: {
            getters: {
                collections: state => state.collections.collections,
                maxCollections: state => state.users.maxCollections,
                // collectionCount: state => state.collections.length,
            },
            actions: {
                getAllCollections,
            },
        },

        methods: {

        },

        computed: {
            collectionCount() {
                return Object.keys(this.collections).length;
            },
        },

        components: {
            ProfileBanner,
            CollectionCard,
            CreateCollection,
        },

        ready() {
            debug('start');
            this.getAllCollections();
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .collection-count {
        float: right;
    }
</style>
