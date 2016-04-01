<template>
    <div v-if="currentMessage" :class="['popup-notification', currentMessage.type, { showing: showing }]"
    @mouseover="stopAnimation"
    @mouseout="startAnimation">
        <div class="message">
            {{ currentMessage.message }}
        </div>
        <i class="fa fa-times close" @click="clearAnimation"></i>
        <div :class="['bar', { active: progress }]" :style="style"></div>
    </div>
</template>

<script>
    import { clearEvent } from 'store/events/actions';

    export default {
        vuex: {
            getters: {
                events: ({ events }) => events.events.filter(event => event.new),
            },
            actions: {
                clearEvent,
            },
        },

        data() {
            return {
                animation: null,
                progress: false,
                showing: false,
                style: {
                    transition: 'width 0s',
                },
            };
        },

        props: {
            duration: {
                type: Number,
                default: 6000,
            },
            debounce: {
                type: Number,
                default: 300,
            },
        },

        computed: {
            /*
                Picks up any "new" items in the event store and refreshes when
                an event is cleared out and more items are in the queue
            */
            currentMessage() {
                if (this.events && this.events.length) this.showMessage();
                return this.events[0];
            },
        },

        methods: {
            // Stops timeout and animation when hovering over
            stopAnimation() {
                this.style.transition = 'width .2s';
                this.progress = false;
                clearTimeout(this.animation);
            },
            // Starts timer and animation when mouse out
            startAnimation() {
                this.progress = true;
                this.style.transition = `width ${this.duration / 1000}s ease-out`;
                this.animation = setTimeout(() => {
                    this.style.transition = 'width 0s';
                    this.showing = false;
                    this.progress = false;
                    this.doClear();
                }, this.duration);
            },
            clearAnimation() {
                this.showing = false;
                this.progress = false;
                this.style.transition = 'width 0s';
                clearTimeout(this.animation);
                this.doClear();
            },
            showMessage() {
                setTimeout(() => {
                    if (!this.showing && this.events && this.events.length) {
                        this.showing = true;
                        this.startAnimation();
                    }
                }, this.debounce);
            },
            // Sends event to the store to clear out the current message
            doClear() {
                if (this.currentMessage) this.clearEvent(this.currentMessage.id, this.debounce);
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .popup-notification {
        position: fixed;
        bottom: 10px;
        left: 10px;
        border-width: 2px;
        border-style: solid;
        z-index: 9999;
        transform: translateY(120%);
        transition: $all-fast;
        box-shadow: $light-shadow;
        border-radius: 4px;

        &.right {
            right: 10px;
            left: auto;
        }

        &.top {
            top: 10px;
            bottom: auto;
        }

        &.showing {
            transform: translateY(0);
        }

        &.default {
            border-color: $blue;
            background-color: rgba($blue, .85);
        }
        &.success {
            border-color: $green;
            background-color: rgba($green, .85);
        }
        &.warning {
            border-color: $yellow;
            background-color: rgba($yellow, .85);
        }
        &.error {
            border-color: $red;
            background-color: rgba($red, .85);
        }

        > .close {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            color: rgba(#000, .6);
            cursor: pointer;

            &:hover {
                color: rgba(#000, .8);
            }
        }

        > .message {
            padding: 18px 42px 18px 18px;
            cursor: default;
        }

        > .bar {
            height: 6px;
            width: 0;
            display: block;
            background-color: rgba(#000, .25);
            transition: width 0s;
            position: absolute;
            bottom: 0;

            &.active {
                width: 100%;
            }
        }
    }

</style>
