<template>
    <div class="context-menu">

        <span v-for="page in subPages" :class="{ active: page.opened}" @click="changePage(page)">{{ page.title }}</span>

    </div>
</template>

<script>
    export default {
        props: ['subPages'],

        methods: {
            changePage(page) {
                debug(page);
                this.subPages.forEach(page => { page.opened = false; });
                page.opened = true;
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .context-menu {
        @include clearfix;
        margin-bottom: 30px;

        > span {
            float: left;
            padding: 10px 20px;
            cursor: pointer;
            transition: $all-fast;
            border-bottom: 3px solid transparent;

            &:hover {
                border-bottom: 3px solid $gray-light;
            }

            &.active {
                border-bottom: 3px solid $blue;
                background: $gray-lighter;
            }
        }
    }
</style>
