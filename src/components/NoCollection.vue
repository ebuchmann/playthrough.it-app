<template>
    <div class="no-collection">
        <div class="top">
            <i class="fa fa-gamepad"></i>
        </div>
        <div class="btn" @click="setState('collectionModal', true)">
            Start your collection
        </div>
        <collection-modal></collection-modal>
    </div>
</template>

<script>
    import { setState } from 'store/state/actions';
    import CollectionModal from 'component/CollectionModal';

    export default {
        vuex: {
            actions: {
                setState,
            },
        },

        components: {
            CollectionModal,
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .no-collection {
        box-shadow: $light-shadow;
        position: relative;

        > .top {
            padding: 30px 60px;
            background: $blue;
            box-shadow: $light-shadow;
            border-bottom: 3px solid $blue-dark;
            text-align: center;

            > .fa {
                font-size: 2.4rem;
                color: #fff;
                border: 2px solid #fff;
                border-radius: 50%;
                padding: 20px 0;
                margin: 0 auto;
                display: block;
                width: 88px;
            }
        }

        > .btn {
            background-color: #fff;
            padding: 20px;
            text-align: center;
            cursor: pointer;
            transition: $all-fast;

            &:hover {
                background-color: $gray-lighter;
            }
        }

        > .right {
            display: none;
        }
    }
</style>
