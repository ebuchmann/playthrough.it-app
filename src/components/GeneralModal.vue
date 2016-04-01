<template>
    <div class="modal-mask" v-show="show" transition="modal">
        <div class="modal-wrapper">
            <div class="modal-container" :style="{ width: this.width }">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['show', 'width'],
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .modal-mask {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: $all-fast;
        display: table;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        margin: 0 auto;
        box-shadow: $light-shadow;
        transition: $all-fast;
    }

    .modal-enter, .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container, {
        transform: scale(1.1);
    }

</style>
