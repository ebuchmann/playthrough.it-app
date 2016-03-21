<template>
    <div class="user-profile">

        <profile-banner :banner="currentUser.banner"></profile-banner>

        <div class="container">
            <span class="collection-count">{{ collections.length }} of {{ currentUser.maxCollections }} collections</span>

            <div class="row">
                <template v-for="collection in collections">
                    <div class="col-3">
                        <collection-card :collection="collection"></collection-card>
                    </div>
                </template>
                <div v-if="currentUser && collections.length < currentUser.maxCollections" class="col-3">
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

    import { getUsersCollections } from 'store/collections/actions';

    export default {
        vuex: {
            getters: {
                collections: ({ collections }) => collections.collections,
                currentUser: ({ users }) => users.currentUser,
                userId: ({ route }) => route.params.userId,
            },
            actions: {
                getUsersCollections,
            },
        },

        methods: {

        },

        components: {
            ProfileBanner,
            CollectionCard,
            CreateCollection,
        },

        route: {
            data() {
                return this.getUsersCollections(this.userId || this.currentUser._id);
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .collection-count {
        float: right;
    }
</style>
