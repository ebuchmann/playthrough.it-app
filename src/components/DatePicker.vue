<template>
    <div class="date-picker input-box">
        <input type="text" v-model="value" :id="random" />
        <span class="validation"></span>
    </div>
</template>

<script>
    import Pikaday from 'pikaday';

    export default {
        props: ['value'],

        methods: {
            sendUpdate() {
                this.$dispatch('send-update', 'completed_on', this.value, this.$el.children[0]);
            },
        },

        computed: {
            random() {
                return Math.random();
            },
        },

        ready() {
            /*eslint-disable */
            new Pikaday({
                field: document.getElementById(this.random),
                onSelect: this.sendUpdate,
            });
            /*eslint-enable */
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

</style>
