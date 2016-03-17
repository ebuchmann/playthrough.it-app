<template>
    <div class="edit-collection">

        <h2>{{collection.title}}</h2>

        <p>Things I'd like to track...</p>

        <span class="button-checkbox" v-for="(key, value) in tracking">
            <label>
                <input type="checkbox" @click="changeTracking(key)" checked="{{value.active}}" hidden />
                <span>{{value.value}}</span>
            </label>
        </span>

        <button @click="saveChanges">Save</button>
        <button @click="this.opened = !this.opened">Cancel</button>
    </div>
</template>

<script>
    import { updateTracking } from 'store/collections/actions';

    export default {
        props: ['opened'],

        vuex: {
            getters: {
                collection: state => state.collections.collections.find(collection => collection._id === state.route.params.collection_id),
                collectionId: state => state.route.params.collection_id,
            },
            actions: {
                updateTracking,
            },
        },

        data() {
            return {
                changes: [],
            };
        },

        computed: {
            tracking() {
                return this.collection.tracking;
            },
        },

        methods: {
            changeTracking(key) {
                const matching = this.changes.find(change => change.value === this.tracking[key].value);
                if (matching) {
                    this.changes.splice(this.changes.indexOf(matching), 1);
                } else this.changes.push(this.tracking[key]);
            },

            saveChanges() {
                this.updateTracking(this.changes);
                this.opened = false;
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
