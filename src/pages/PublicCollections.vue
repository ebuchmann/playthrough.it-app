<template>
    <div class="public-collection">

        <div class="container">

            <h1 class="title">List Public Collections</h1>

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
    import CollectionCard from 'component/CollectionCard';
    import { getAllCollections } from 'store/collections/actions';

    export default {
        vuex: {
            getters: {
                collections: ({ collections }) => collections.collections,
            },
            actions: {
                getAllCollections,
            },
        },

        components: {
            CollectionCard,
        },

        route: {
            data() {
                return this.getAllCollections();
            },
        },
    };
</script>

<style lang="sass">

</style>
