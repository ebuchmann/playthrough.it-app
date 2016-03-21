<template>
    <div class="edit-collection">

        <h2>{{collection.title}}</h2>

        <p>Things I'd like to track...</p>

        <span class="button-checkbox" v-for="(key, value) in possibleDisplay">
            <label>
                <input type="checkbox" @click="saveChanges(`display.${value}`, !collection.display[value])" checked="{{ collection.display[value] }}" hidden />
                <span>{{ value }}</span>
            </label>
        </span>

        <span @click="saveChanges('active', !collection.active)">{{ collection.active }}</span><br />
        <span @click="saveChanges('public', !collection.public)">{{ collection.public }}</span><br />
        <span @click="saveChanges('suggestions', !collection.suggestions)">{{ collection.suggestions }}</span>

        <button @click="saveChanges">Save</button>
        <button @click="this.opened = !this.opened">Cancel</button>
    </div>
</template>

<script>
    import { updateCollection } from 'store/collections/actions';

    export default {
        props: ['opened'],

        vuex: {
            getters: {
                collection: ({ collections, route }) => collections.collections.find(collection => collection._id === route.params.collectionId),
                collectionId: ({ route }) => route.params.collectionId,
            },
            actions: {
                updateCollection,
            },
        },

        data() {
            return {
                changes: [],
                possibleDisplay: ['platform', 'genres', 'time', 'date', 'rating', 'deaths'],
            };
        },

        computed: {
            tracking() {
                return this.collection.display;
            },
        },

        methods: {
            changeTracking(key) {
                const matching = this.changes.find(change => change.value === this.tracking[key].value);
                if (matching) {
                    this.changes.splice(this.changes.indexOf(matching), 1);
                } else this.changes.push(this.tracking[key]);
            },

            saveChanges(property, value) {
                this.updateCollection(this.collectionId, { [property]: value });
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .edit-collection {
        background: #fff;
        border: 5px solid lighten(#01afee, 30);
        padding: 25px;
        margin: 25px 0;
    }

    .button-checkbox {
        > label {
            > span {
                margin-right: 20px;
                padding: 5px 10px;
                cursor: pointer;
                background-color: #fff;
                transition: $all-fast;
                border: 2px solid transparent;
            }

            > input:checked + span {
                box-shadow: $light-shadow;
                border: 2px solid rgba($green, .6);
            }
        }
    }

</style>
