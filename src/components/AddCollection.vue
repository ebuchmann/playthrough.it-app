<template>
    <div v-if="opened" class="add-collection">



    </div>
</template>

<script>
    export default {

        data () {
            return {
                opened: false
            }
        },

        events: {
            'addCollection::open-modal' () {
                debug('open modal')
                this.opened = !this.opened
                debug(this.opened)
            }
        }

    }
</script>

<style lang="sass">
    @import '../css/variables';

    .add-collection {
        position: absolute;
        border: 1px solid $gray-lighter;
        background: #fff;
        max-width: 320px;
        height: 300px;
    }

</style>
