<template>
    <div class="home-page">

        <div class="container">

            <home-hero></home-hero>

            <div class="homeleft">
                <no-collection></no-collection>
                <collection-overview></collection-overview>
            </div>
            <div class="homeright">
                <activity-item></activity-item>
            </div>
        </div>

    </div>
</template>

<script>
    import HomeHero from 'component/HomeHero';
    import NoCollection from 'component/NoCollection';
    import CollectionOverview from 'component/CollectionOverview';
    import ActivityItem from 'component/ActivityItem';
    import { sendEvent } from 'store/events/actions';

    export default {
        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                sendEvent,
            },
        },

        components: {
            HomeHero,
            NoCollection,
            ActivityItem,
            CollectionOverview,
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .home-page {
        > .hero {
            margin-top: - $spacing-vert;
            height: 400px;
            background-color: $blue;
        }
    }

    .homeleft {
        @include span(2 of 12);
    }
    .homeright {
        @include span(7 of 12);
    }
</style>
