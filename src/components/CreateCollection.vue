<template>
    <div class="create-collection">
        <div class="before-adding" :class="{ 'during-adding': opened }" @click="openMenu">
            <p v-if="!opened" class="before">Create a new collection</p>
            <div class="opened-container" v-show="opened">
                <input id="collection" class="collection-input" v-el:input v-model="name" placeholder="Name your collection" @keyup.enter="saveCollection" autocomplete="off" /><br />
                <button class="button cancel" @click.stop="cancelCollection"></button>
                <button class="button" @click.stop="saveCollection">Save it</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { addCollection } from 'store/collections/actions';

    export default {
        data() {
            return {
                name: '',
                opened: false,
            };
        },

        vuex: {
            getters: {

            },
            actions: {
                addCollection,
            },
        },

        methods: {
            openMenu() {
                this.opened = true;
                this.$nextTick(() => {
                    this.$els.input.focus();
                });
            },

            saveCollection() {
                this.addCollection(this.name).then(() => {
                    this.name = '';
                    this.opened = false;
                }).catch(err => {
                    debug(err);
                });
            },

            cancelCollection() {
                this.opened = false;
                this.name = '';
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .create-collection {
        margin-top: 30px;
        height: 200px;
    }

    .before-adding {
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        border: 2px dashed $blue-dark;
        transition: $all-fast;
        background-color: transparent;

        > .before {
            text-align: center;
            color: $blue;
            font-weight: bold;
            font-size: 1.4rem;
            width: 100%;
            margin: 0;
        }
    }

    .during-adding {
        box-shadow: $light-shadow;
        border-color: transparent;
        background-color: #fff;

        &:hover {
            box-shadow: $medium-shadow;
        }
    }

    .opened-container {
        width: 100%;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .collection-input {
        width: 80%;
        margin: 0 auto;
        border: none;
        border-bottom: 2px solid $blue-dark;
        display: block;
        font-size: 1.5rem;
        transition: $all-fast;

        &:focus {
            border-color: $blue;
            outline: none;
        }
    }



</style>
