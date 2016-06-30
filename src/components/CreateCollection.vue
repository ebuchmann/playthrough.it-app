<template>
    <div :class="['create-collection', { opened: opened }]"  @click="openMenu">
        <input class="input" v-if="opened" transition="fade" v-el:input v-model="name" :placeholder="placeholder" @keyup.enter="saveCollection" autocomplete="off" />
        <p class="text" v-else="opened" transition="fade">{{ placeholder }}</p>
        <div class="buttongroup" v-show="opened" transition="fade">
            <button class="button cancel" @click.stop="cancelCollection">Cancel</button>
            <button class="button" @click.stop="saveCollection">Save</button>
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

        computed: {
            placeholder() {
                return this.opened ? 'Name your collection...' : 'Create a new collection';
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
        border-bottom: 2px solid transparent;
        height: 200px;
        margin: 15px 0;
        outline: 1px dashed $blue-dark;
        position: relative;
        text-align: center;
        transition: $all-slow;
        width: 100%;
        cursor: pointer;

        &.opened {
            outline: 1px dashed transparent;
            border-bottom: 2px solid $blue;
            background: #fff;
            box-shadow: $light-shadow;
            cursor: auto;
        }

        > .input, > .text {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            position: absolute;
            height: 40px;
            font-size: 1.4rem;
        }

        > .input {
            width: 80%;
            background-color: transparent;
            border-bottom: 2px solid $blue;
        }

        > .text {
            color: $blue;
            cursor: pointer;
        }

        .buttongroup {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
    }

    .fade-transition {
        transition: $all-fast;
    }
    .fade-enter, .fade-leave {
        opacity: 0;
    }

</style>
