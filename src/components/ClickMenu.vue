<template>
    <span class="click-menu" v-bind:class="{ 'opened': opened }">
        <span @click="open">
            <slot name="menu"></slot>
        </span>
        <span v-show="opened">
            <slot name="content"></slot>
        </span>
    </span>
</template>

<script>
    export default {
        data() {
            return {
                opened: false,
            };
        },

        methods: {
            open() {
                setTimeout(() => {
                    this.opened = true;
                }, 15);
            },
        },

        events: {
            'hide::dropdown'() {
                if (this.opened) this.opened = false;
            },
        },
    };
</script>

<style lang="sass">

</style>
