<template>
    <div class="collection-single">

        <profile-banner :banner="collection.user.banner"></profile-banner>

        <div class="container" v-if="!$loadingRouteData">

            <div class="status-bar" v-bind:style="{ width: percent + '%'}"></div>

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
                    <p class="collection-status">
                        Started on <strong>{{ collection.created_at | date }}</strong> <br />
                        Collection is <span :class="collection.active ? '-green' : '-red'">{{ activeText }}</span> and <span :class="collection.public ? '-green' : '-red'">{{ publicText }}</span><br />
                        You are <span :class="collection.suggestions ? '-green' : '-red'">{{ suggestionText }}</span> for suggestions on games<br />
                        <strong>{{ collection.completed }}</strong> of <strong>{{ collection.games }}</strong> games complete!<br />
                        <template v-if="currentUser._id === collection.user._id">
                            <span @click="this.editOpened = !this.editOpened">Edit collection</span><br />
                            <span @click="this.gameAddOpened = !this.gameAddOpened">Add Games</span>
                        </template>
                    </p>
                </div>
            </div>

            <game-suggestion v-if="currentUser && currentUser._id !== collection.user._id" :user_id="collection.user._id"></game-suggestion>

            <suggested-games v-for="suggestion in suggestions" :suggestion="suggestion"></suggested-games>

            <template v-if="currentUser._id === collection.user._id">
                <edit-collection v-if="editOpened" :opened.sync="editOpened"></edit-collection>
                <item-add v-if="gameAddOpened"></item-add>
            </template>
            <game-table></game-table>
        </div>

    </div>
</template>

<script>
    import GameTable from 'component/GameTable';
    import ItemAdd from 'component/ItemAdd';
    import EditCollection from 'component/EditCollection';
    import ProfileBanner from 'component/ProfileBanner';
    import GameSuggestion from 'component/GameSuggestion';
    import SuggestedGames from 'component/SuggestedGames';

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
            ProfileBanner,
            EditCollection,
            GameSuggestion,
            SuggestedGames,
        },

        data() {
            return {
                header: false,
                editOpened: false,
                gameAddOpened: false,
            };
        },

        computed: {
            headerText() {
                return this.collection.title;
            },
            activeText() {
                return this.collection.active ? 'Open' : 'Closed';
            },
            publicText() {
                return this.collection.public ? 'Public' : 'Private';
            },
            suggestionText() {
                return this.collection.suggestions ? 'Open' : 'Not Open';
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

    .collection-status {
        text-align: right;

        > span {
            font-weight: bold;
        }

        > .-red {
            color: $red;
        }
        > .-green {
            color: $green;
        }
    }

    .status-bar {
        margin-bottom: 25px;
        background: $green;
        height: 4px;
    }

</style>
