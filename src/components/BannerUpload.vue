<template>
    <div class="banner-upload">

        <p class="message">Click or drop image to upload</p>
        <input id="test" class="uploader" type="file" v-on:change="submitForm" />

    </div>
</template>

<script>
    import { changeBanner } from 'store/users/actions';

    export default {
        vuex: {
            getters: {

            },
            actions: {
                changeBanner,
            },
        },

        methods: {
            submitForm() {
                const file = document.getElementById('test').files[0];
                const reader = new FileReader();

                reader.onload = () => {
                    this.changeBanner(reader.result);
                };

                reader.readAsDataURL(file);
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .banner-upload {
        position: absolute;
        outline: 2px dashed #fff;
        outline-offset: -20px;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        background-color: rgba($dark, .75);

        > .message {
            position: absolute;
            width: 100%;
            height: 100%;
            text-align: center;
            color: #fff;
            font-size: 2.2rem;
        }

        > .uploader {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
        }
    }
</style>
