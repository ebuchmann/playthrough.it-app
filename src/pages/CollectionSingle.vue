<template>
    <div class="collection-single">

        <profile-banner></profile-banner>

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
                        <span @click="this.editOpened = !this.editOpened">Edit collection</span><br />
                        <span @click="this.gameAddOpened = !this.gameAddOpened">Add Games</span>
                    </p>
                </div>
            </div>

            <edit-collection v-if="editOpened" :opened.sync="editOpened"></edit-collection>
            <game-list-add v-if="gameAddOpened"></game-list-add>
            <game-table></game-table>
        </div>

    </div>
</template>

<script>
    import GameTable from 'component/GameTable';
    import itemAdd from 'component/itemAdd';
    import EditCollection from 'component/EditCollection';
    import ProfileBanner from 'component/ProfileBanner';

    import { getCollection } from 'store/collections/actions';
    import { getCollectionGames } from 'store/items/actions';

    export default {

        vuex: {
            getters: {
                collection: ({ collections, route }) => collections.collections.find(collection => collection._id === route.params.collectionId),
                collectionId: ({ route }) => route.params.collectionId,
            },
            actions: {
                getCollection,
                getCollectionGames,
            },
        },

        components: {
            GameTable,
            itemAdd,
            ProfileBanner,
            EditCollection,
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
                // this.setTitle(this.collectionId, document.getElementsByClassName('edit-title')[0].value);
                this.header = false;
            },
        },

        route: {
            data() {
                return Promise.all([
                    this.getCollection(this.collectionId),
                    this.getCollectionGames(this.collectionId),
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
