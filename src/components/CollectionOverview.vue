<template>
    <div class="collection-overview">
        <p>Woah, your collection data!</p>
        <div v-for="collection in collections">
            {{ collection.title }}<br />
            {{ collection.current }}
        </div>
    </div>
</template>

<script>
    import { getUsersCollections } from 'store/collections/actions';

    export default {
        vuex: {
            getters: {
                collections: ({ collections }) => collections.collections,
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                getUsersCollections,
            },
        },

        ready() {
            return this.getUsersCollections(this.currentUser._id);
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .collection-overview {

    }
</style>
