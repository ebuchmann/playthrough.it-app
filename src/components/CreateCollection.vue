<template>
    <div class="create-collection">
        <div :class="['before-adding', { 'during-adding': opened }]" @click="openMenu">
            <p v-if="!opened" class="before">Create a new collection</p>
            <div class="opened-container" v-show="opened">
                <input class="collection-input" v-el:input v-model="name" placeholder="Name your collection..." @keyup.enter="saveCollection" autocomplete="off" />
                <button class="button" @click.stop="saveCollection">Save</button>
                <button class="button cancel" @click.stop="cancelCollection">Cancel</button>
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
        margin: 15px 0;
        height: 200px;
        border-bottom: 2px solid $blue;
    }

    .before-adding {
        cursor: pointer;
        height: 100%;
        width: 100%;
        display: table;
        border: 2px dashed $blue-dark;
        transition: $all-fast;
        background-color: transparent;

        > .before {
            display: table-cell;
            vertical-align: middle;
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
        padding: 30px;
        display: table-cell;
        vertical-align: middle;

        > .button {
            float: right;
            margin-left: 15px;
        }
    }

    .collection-input {
        margin: 0 auto;
        border: none;
        border-bottom: 2px solid $blue-dark;
        display: block;
        font-size: 1.5rem;
        transition: $all-fast;
        margin-bottom: 25px;

        &:focus {
            border-color: $blue;
            outline: none;
        }
    }



</style>
