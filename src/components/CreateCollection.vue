<template>
    <div class="create-collection">
        <div class="before-adding" :class="{ 'during-adding': opened }" @click="openMenu">
            <p v-if="!opened" class="before">Add a new collection</p>
            <div class="opened-container" v-show="opened">
                <input id="collection" class="collection-input" v-model="name" placeholder="Name your collection" @keyup.enter="saveCollection" autocomplete="off" /><br />
                <button class="button-save" @click.stop="saveCollection">Save it</button>
                <span class="button-cancel" @click.stop="cancelCollection"></span>
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
                setTimeout(() => {
                    document.getElementById('collection').focus();
                }, 25);
            },

            saveCollection() {
                if (this.addCollection(this.name)) {
                    this.name = '';
                    this.opened = false;
                }
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

    .button-save {
        color: $blue;
        border: none;
        background: none;
        font-size: 1.5rem;
        position: absolute;
        bottom: 20px;
        right: 10%;
        cursor: pointer;
        padding: 2px 12px;

        &::after {
            content: '\f0da';
            font-family: FontAwesome;
            padding-left: 8px;
        }

        &:hover {
            color: lighten($blue, 20);
        }
    }

    .button-cancel {
        position: absolute;
        top: 5px;
        right: 15px;
        color: $red;
        font-family: FontAwesome;
        font-size: 1.5rem;
        opacity: .5;
        transition: $all-slow;

        &:hover {
            opacity: 1;
        }

        &::before {
            content: $icon-abandoned;
        }
    }

</style>
