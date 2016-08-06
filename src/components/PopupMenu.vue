<template>
    <div class="popup-menu" @click="doOpen()" @blur="doClose()" tabindex="0">
        <slot></slot>
        {{ opened }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                opened: false,
            };
        },

        methods: {
            doOpen() {
                const menu = this.$el.querySelector('.menu');
                this.opened = !this.opened;

                if (this.opened) {
                    menu.classList.add('opened');
                } else {
                    menu.classList.remove('opened');
                    this.$el.blur();
                }
            },

            doClose() {
                const menu = this.$el.querySelector('.menu');
                this.opened = false;
                menu.classList.remove('opened');
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .popup-menu {

        > .menu {
            background: #fff;
            border: 1px solid $gray-lighter;
            display: none;
            opacity: 0;
            visibility: hidden;
            list-style: none;
            padding: 0;
            position: absolute;
            z-index: 999;

            &.opened {
                display: block;
                opacity: 1;
                visibility: visible;
            }

            > li {
                padding: 5px;

                &:hover {
                    background: $gray-lighter;
                }
            }
        }
    }
</style>
