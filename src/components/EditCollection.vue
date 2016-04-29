<template>
    <div class="edit-collection">

        <div class="row">
            <div class="labels">
                <label>Title</label>
            </div>
            <div class="inputs">
                <input class="input" type="text" v-model="collectionTitle" />
            </div>
        </div>

        <div class="row">
            <div class="labels">
                <label>Display settings</label>
            </div>
            <div class="inputs">
                <label class="label" v-for="(key, value) in display">
                    <input class="checkbox" type="checkbox" @click="display[key] = !display[key]" checked="{{ value }}" />
                    <span class="span"></span>
                    {{ key | capitalize }}
                </label>
                <small class="extra">These determine what displays in the table view of this collection.</small>
            </div>
        </div>

        <div class="row">
            <div class="labels">
                <label>Privacy settings</label>
            </div>
            <div class="inputs">
                <label class="label">
                    <input  class="checkbox" type="checkbox" @click="collectionPublic = !collectionPublic" checked="{{ collectionPublic }}" />
                    <span class="span"></span>
                    <span v-if="collectionPublic">This collection is currently public.</span>
                    <span v-else>This collection is currently private.</span>
                </label>
                <small class="extra">Setting this to private will prevent people from viewing this collection.</small>
            </div>
        </div>

        <div class="row">
            <div class="labels"></div>
            <div class="inputs">
                <button class="button" @click="saveChanges()">Save</button>
                <button class="button cancel">Cancel</button>
            </div>
        </div>

        <span class="remove-button" @click="doRemoveCollection()">
            <i class="fa fa-trash"></i> Remove Collection
        </span>

    </div>
</template>

<script>
    import { updateCollection, removeChallenge } from 'store/collections/actions';

    export default {
        vuex: {
            getters: {
                collection: ({ collections, route }) => collections.collections.find(collection => collection._id === route.params.collectionId),
                collectionId: ({ route }) => route.params.collectionId,
            },
            actions: {
                updateCollection,
                removeChallenge,
            },
        },

        data() {
            return {
                possibleDisplay: ['platform', 'genres', 'time', 'date', 'rating', 'deaths'],
                collectionTitle: this.collection.title,
                collectionPublic: this.collection.public,
                display: JSON.parse(JSON.stringify(this.collection.display)),
            };
        },

        methods: {
            saveChanges() {
                this.updateCollection(this.collectionId, {
                    display: this.display,
                    title: this.collectionTitle,
                    public: this.collectionPublic,
                });
            },

            doRemoveCollection() {
                // TODO: verify if you really want to delete this...
                this.removeChallenge(this.collection._id).then(() => {
                    this.$router.go({ name: 'userProfile' });
                });
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .edit-collection {
        background: #fff;
        box-shadow: $light-shadow;
        margin: 25px 0;
        padding: 20px;
        border-bottom: 3px solid $blue;
        position: relative;
    }
</style>
