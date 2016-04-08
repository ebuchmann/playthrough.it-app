<template>
    <div class="collection-single">

        <div v-if="!$loadingRouteData">
            <div class="full">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <h1 class="title" @click="editHeader()">
                                <template v-if="!header">{{ collection.title }}</template>
                                <template v-else>
                                    <input @keyup.enter.stop="saveHeader()" @keyup.esc.stop="header = false" class="edit-title" v-else v-model="headerText" /><br />
                                    <button @click.stop="saveHeader()">Save</button>
                                    <button @click.stop="header = false">Cancel</button>
                                </template>
                            </h1>
                        </div>
                        <div class="col-6-last">
                            <user-card></user-card>
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
                        <item-add v-show="subPages[1].opened"></item-add>
                        <edit-collection v-show="subPages[2].opened"></edit-collection>
                        <game-table :filter.sync="filter"></game-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GameTable from 'component/GameTable';
    import ItemAdd from 'component/ItemAdd';
    import EditCollection from 'component/EditCollection';
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
            ItemAdd,
            EditCollection,
            GameSuggestion,
            SuggestedGames,
            FilterList,
            ContextMenu,
            UserCard,
        },

        data() {
            return {
                header: false,
                editOpened: false,
                filter: '',
                subPages: [
                    { title: 'View Games', opened: true },
                    { title: 'Add Games', opened: false },
                    { title: 'Manage Collection', opened: false },
                    { title: 'Manage Suggestions', opened: false },
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

        methods: {
            editHeader() {
                this.header = true;
                setTimeout(() => {
                    document.getElementsByClassName('edit-title')[0].focus();
                }, 25);
            },

            saveHeader() {
                this.updateCollection(this.collectionId, { title: document.getElementsByClassName('edit-title')[0].value }).then(() => {
                    this.header = false;
                });
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
        margin-bottom: 30px;
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

            &:hover {
                cursor: pointer;
            }

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
