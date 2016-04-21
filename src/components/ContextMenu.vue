<template>
    <div class="context-menu">

        <a class="link" v-for="page in subPages" v-link="{ name: page.name, exact: true, replace: true }">{{ page.title }}</a>

    </div>
</template>

<script>
    export default {
        props: ['subPages'],
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .context-menu {
        @include clearfix;
        margin-bottom: 30px;

        > .link {
            float: left;
            padding: 10px 20px;
            cursor: pointer;
            transition: $all-fast;
            border-bottom: 3px solid transparent;
            color: $dark;

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
