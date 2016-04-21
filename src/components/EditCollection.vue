<template>
    <div class="edit-collection">
        <div class="card-top">
            <h2>{{ collection.title }}</h2>
        </div>
        <div class="card-body">

            <div class="row">
                <p>Display settings</p>
                <span class="button-checkbox" v-for="(key, value) in possibleDisplay">
                    <label>
                        <input type="checkbox" @click="saveChanges(`display.${value}`, !collection.display[value])" checked="{{ collection.display[value] }}" hidden />
                        <span>{{ value | capitalize }}</span>
                    </label>
                </span>
            </div>

            <div class="row">
                <p>Collection settings</p>
                <div class="button-checkbox">
                    <label>
                        <input type="checkbox" @click="saveChanges('public', !collection.public)" checked="{{ collection.public }}" hidden />
                        <span v-if="collection.public">This collection is currently public.</span>
                        <span v-else>This collection is currently private.</span>
                    </label>
                </div>
            </div>

            <div class="row">
                <button @click="doRemoveCollection()">Remove Collection</button>
            </div>

        </div>
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
            };
        },

        computed: {
            tracking() {
                return this.collection.display;
            },
        },

        methods: {
            saveChanges(property, value) {
                this.updateCollection(this.collectionId, { [property]: value });
            },

            doRemoveCollection() {
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
    }

    .button-checkbox {
        float: left;
        margin-bottom: 15px;

        > label {
            > span {
                margin-right: 20px;
                padding: 5px 10px;
                cursor: pointer;
                transition: $all-fast;
                border-left: 4px solid $yellow;
            }

            > input:checked + span {
                background-color: $gray-lighter;
                border-left: 4px solid $green;
            }
        }
    }

</style>
