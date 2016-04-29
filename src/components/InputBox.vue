<template>
    <span :class="['input-box', style]">
        <label v-el:label class="label">{{ label }}</label>
        <template v-if="type === 'text'">
            <input v-el:input class="input" type="text" v-model="value" @change="doSave" @click="clearClass"/>
        </template>
        <template v-if="type === 'textarea'">
            <textarea v-el:input v-if="editing" class="input" v-model="value" v-on:blur="editing = !editing" @change="doSave" @click="clearClass"></textarea>
            <div class="editable" v-else @click="startEditing()" v-html="value | marked"></div>
        </template>
        <span class="validation"></span>
    </span>
</template>

<script>
    export default {
        props: ['value', 'event', 'type', 'id', 'filter', 'label', 'style', 'property'],

        data() {
            return {
                editing: false,
            };
        },

        methods: {
            doSave() {
                this.$els.input.disabled = true;
                this.event(this.id, { [this.property]: this.value }).then(() => {
                    if (this.$els.input) {
                        this.$els.input.disabled = false;
                        this.editing = false;
                        this.$els.input.classList.add('success');
                        setTimeout(() => {
                            this.$els.input.classList.remove('success');
                        }, 5000);
                    }
                });
            },

            clearClass() {
                this.$els.input.classList.remove('success');
            },

            startEditing() {
                this.editing = true;
                setTimeout(() => {
                    this.$els.input.focus();
                }, 20);
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .input-box {
        position: relative;
        display: inline-block;
        width: 100%;

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
