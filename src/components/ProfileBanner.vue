<template>
    <div class="profile-banner">

        <img :src="banner" />

        <banner-upload v-if="uploading"></banner-upload>
        <button class="edit-button" @click="uploading = !uploading">Edit Banner</button>

    </div>
</template>

<script>
    import BannerUpload from 'component/BannerUpload';

    export default {
        props: ['banner'],

        data() {
            return {
                uploading: false,
            };
        },

        components: {
            BannerUpload,
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .profile-banner {
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        margin-bottom: 40px;

        @include breakpoint(md) {
            height: 200px;
            line-height: 200px;
        }
        @include breakpoint(lg) {
            height: 260px;
            line-height: 260px;
        }
        @include breakpoint(xl) {
            height: 350px;
            line-height: 350px;
        }
        @include breakpoint(vl) {
            height: 420px;
            line-height: 420px;
        }

        > img {
            position: absolute;
            left: 0;
            right: 0;
            top: -9999px;
            bottom: -9999px;
            margin: auto 0;
            width: 100%;
        }
    }

    .edit-button {
        position: absolute;
        top: 20px;
        right: 20px;
        line-height: 1.5;
    }
</style>
