<template>
    <span class="input-box">
        <input type="text" v-model="value" @change="doSave" @click="clearClass"/>
        <span class="validation"></span>
    </span>
</template>

<script>
    export default {
        props: ['value', 'event', 'type', 'id', 'filter'],

        methods: {
            doSave() {
                const input = this.$el.children[0];
                input.disabled = true;
                this.event(this.id, { [this.type]: this.value }).then(() => {
                    input.disabled = false;
                    input.classList.add('success');
                    setTimeout(() => {
                        input.classList.remove('success');
                    }, 5000);
                });
            },

            clearClass() {
                const input = this.$el.children[0];
                input.classList.remove('success');
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .input-box {
        position: relative;
        display: inline-block;

        > input {
            padding: 10px;
            font-size: 1rem;
            border: 1px solid $gray-dark;

            &:focus, &:active {
                border-color: rgba($blue, .5);
            }
        }

        > input[disabled] {
            border-color: $yellow;
        }

        > .validation {
            position: absolute;
            top: 6px;
            right: 5px;
        }

        > input.success + .validation::after {
            content: '\f00c';
            font-family: FontAwesome;
            color: $green;
            font-size: 1.4rem;
        }
    }
</style>
