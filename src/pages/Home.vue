<template>
    <div class="home-page">

        <div class="hero">

        </div>

        <div class="container">
            <div class="left">
                Left
            </div>
            <div class="right">
                Right
                <button @click="sender()">Event</button>
            </div>
        </div>

    </div>
</template>

<script>
    import { sendEvent } from 'store/events/actions';

    export default {
        vuex: {
            actions: {
                sendEvent,
            },
        },

        methods: {
            sender() {
                const types = ['success', 'warning', 'error', 'default'];
                const number = Math.floor(Math.random() * 4);
                this.sendEvent({ message: Math.random(), type: types[number] });
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .home-page {
        > .hero {
            margin-top: - $spacing-vert;
            height: 400px;
            background-color: $blue;
        }
    }
</style>
