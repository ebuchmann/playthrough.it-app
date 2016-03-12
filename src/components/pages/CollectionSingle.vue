<template>
    <div class="collection-single">

        <profile-banner></profile-banner>

        <div class="container">

            <div class="status-bar" v-bind:style="{ width: percent + '%'}"></div>

            <div class="row">
                <div class="col-6">
                    <h1 class="title" @click="editHeader()">
                        <template v-if="!header">{{ selectedCollection.title }}</template>
                        <template v-else>
                            <input @keyup.enter.stop="saveHeader()" @keyup.esc.stop="header = false" class="edit-title" v-else v-model="headerText" />
                            <button @click.stop="saveHeader()">Save</button>
                            <button @click.stop="header = false">Cancel</button>
                        </template>
                    </h1>
                </div>
                <div class="col-6-last">
                    <p class="collection-status">
                        Started on <strong>{{ selectedCollection.start_date | date }}</strong> <br />
                        Collection is <span :class="collectionStatus ? '-green' : '-red'">{{ selectedCollection.status }}</span> and <span :class="collectionPrivate ? '-green' : '-red'">{{ selectedCollection.private }}</span><br />
                        <strong>{{ completedCount }}</strong> of <strong>{{ gameCount }}</strong> games complete!<br />
                        <span @click="this.editOpened = !this.editOpened">Edit collection</span><br />
                        <span @click="toggleProperty(selectedCollection.id, 'addGames')">Add Games</span>
                    </p>
                </div>
            </div>

            <edit-collection v-if="editOpened" :opened.sync="editOpened"></edit-collection>
            <game-list-add v-if="selectedCollection.addGames"></game-list-add>
            <game-table></game-table>
        </div>

    </div>
</template>

<script>
    import GameTable from 'component/GameTable';
    import GameListAdd from 'component/GameListAdd';
    import EditCollection from 'component/EditCollection';
    import ProfileBanner from 'component/ProfileBanner';

    import { setTitle, toggleProperty } from 'store/actions';

    export default {

        vuex: {
            getters: {
                selectedCollection: state => state.collections[state.route.params.collection_id],
                collectionId: state => state.route.params.collection_id,
            },
            actions: {
                setTitle,
                toggleProperty,
            },
        },

        components: {
            GameTable,
            GameListAdd,
            ProfileBanner,
            EditCollection,
        },

        data() {
            return {
                header: false,
                editOpened: false,
            };
        },

        computed: {
            headerText() {
                return this.selectedCollection.title;
            },
            collectionStatus() {
                return this.selectedCollection.status === 'Opened';
            },
            collectionPrivate() {
                return this.selectedCollection.private === 'Public';
            },
            gameCount() {
                return this.selectedCollection.gameList.length;
            },
            completedCount() {
                return this.selectedCollection.gameList.filter(game => game.status === 'Finished').length;
            },
            percent() {
                return Math.round(10 * (this.completedCount / this.gameCount * 100)) / 10 || 0;
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
                this.setTitle(this.$route.params.collection_id, document.getElementsByClassName('edit-title')[0].value);
                this.header = false;
            },
        },

    };
</script>

<style lang="sass">
    @import '../../css/includes';

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
