<template>
    <div class="home-page">

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

<style>

</style>
