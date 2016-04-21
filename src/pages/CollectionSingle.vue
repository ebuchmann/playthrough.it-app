<template>
    <div class="collection-single">

        <div v-if="!$loadingRouteData">
            <div class="full">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <h1 class="title">{{ collection.title }}</h1>
                        </div>
                        <div class="col-6-last">

                        </div>
                    </div>
                </div>
            </div>

            <div class="container">


                <template v-if="currentUser._id === collection.user._id">
                    <suggested-games v-for="suggestion in suggestions" :suggestion="suggestion"></suggested-games>
                </template>

                <div class="row">
                    <div class="col-left">
                        <filter-list :filter.sync="filter"></filter-list>
                        <game-suggestion :collection="collection"></game-suggestion>
                    </div>
                    <div class="col-right">
                        <context-menu :sub-pages.sync="subPages"></context-menu>
                        <router-view></router-view>
                        <game-table :filter.sync="filter"></game-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GameTable from 'component/GameTable';
    import GameSuggestion from 'component/GameSuggestion';
    import SuggestedGames from 'component/SuggestedGames';
    import FilterList from 'component/FilterList';
    import ContextMenu from 'component/ContextMenu';
    import UserCard from 'component/UserCard';

    import { getCollection, updateCollection } from 'store/collections/actions';
    import { getCollectionGames } from 'store/items/actions';
    import { getSuggestions } from 'store/suggestions/actions';

    export default {
        vuex: {
            getters: {
                collection: ({ collections, route }) => collections.collections.find(collection => collection._id === route.params.collectionId),
                collectionId: ({ route }) => route.params.collectionId,
                currentUser: ({ users }) => users.currentUser,
                suggestions: ({ suggestions }) => suggestions.newSuggestions,
            },
            actions: {
                getCollection,
                getCollectionGames,
                updateCollection,
                getSuggestions,
            },
        },

        components: {
            GameTable,
            GameSuggestion,
            SuggestedGames,
            FilterList,
            ContextMenu,
            UserCard,
        },

        data() {
            return {
                editOpened: false,
                filter: '',
                subPages: [
                    { title: 'View Games', name: 'single_collection' },
                    { title: 'Add Games', name: 'addGames' },
                    { title: 'Manage Collection', name: 'manageCollection' },
                    { title: 'Manage Suggestions', name: 'gameSuggestions' },
                ],
            };
        },

        computed: {
            headerText() {
                return this.collection.title;
            },
            percent() {
                return Math.round(10 * (this.collection.completed / this.collection.games * 100)) / 10 || 0;
            },
        },

        route: {
            data() {
                debug('data');
                return Promise.all([
                    this.getCollection(this.collectionId),
                    this.getCollectionGames(this.collectionId),
                    this.getSuggestions(this.collectionId),
                ]);
            },
        },

    };
</script>

<style lang="sass">
    @import '../css/includes';

    .full {
        background: #fff;
        box-shadow: $light-shadow;
        padding: 30px 0;
        margin-bottom: $spacing-vert;
        margin-top: - $spacing-vert;
    }

    .col-left {
        @include span(2 of 12);
    }
    .col-right {
        @include span(10 of 12 last);
    }

    .collection-single {

        .title {
            position: relative;
            word-wrap: break-word;

            > input {
                border: none;
                font-size: 2rem;
                background: none;
                outline: none;
                font-weight: bold;
                padding: 0;
                width: 100%;
            }
        }
    }

</style>
