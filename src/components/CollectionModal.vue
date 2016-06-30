<template>
    <div>
        <general-modal :show="opened" :width="'500px'" @click="setState('collectionModal', false)">
            <div class="collection-modal" @click.stop>
                <h2 class="title">Create a collection</h2>
                <input class="input" v-el:input v-model="name" placeholder="Collection name..." @keyup.esc="setState('collectionModal', false)" @keyup.enter="saveCollection()" autocomplete="off" />
                <div class="buttongroup">
                    <button class="button cancel" @click="setState('collectionModal', false)">Cancel</button>
                    <button class="button" @click.stop="saveCollection()">Save</button>
                </div>
            </div>
        </general-modal>
    </div>
</template>

<script>
    import GeneralModal from 'component/GeneralModal';
    import { addCollection } from 'store/collections/actions';
    import { setState } from 'store/state/actions';

    export default {
        components: {
            GeneralModal,
        },

        data() {
            return {
                name: null,
            };
        },

        vuex: {
            actions: {
                addCollection,
                setState,
            },
            getters: {
                opened: ({ state }) => state.collectionModal,
            },
        },

        methods: {
            saveCollection() {
                this.addCollection(this.name).then(collection => {
                    this.name = null;
                    this.setState('collectionModal', false);
                    this.$router.go({ name: 'single_collection', params: { collectionId: collection._id } });
                }).catch(err => {
                    debug(err);
                });
            },
        },

        watch: {
            'opened'() {
                if (this.opened) {
                    this.$nextTick(() => {
                        this.$els.input.focus();
                    });
                }
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .collection-modal {
        height: 240px;
        background: #fff;
        position: relative;
        padding: 20px;

        > .title {
            text-align: center;
        }

        > .input {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            height: 40px;
            font-size: 1.4rem;
            position: absolute;
            width: 80%;
            border-bottom: 2px solid $blue-dark;

            &:focus {
                border-bottom: 2px solid $blue;
            }

        }

        .buttongroup {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
    }
</style>
