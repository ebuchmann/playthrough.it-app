<template>
    <div class="profile-uploader">

        <div v-el:pic class="image">
            <img v-el:real class="realimg" />
            <input class="uploader" v-el:input type="file" @change="setImage()" />
        </div>

        <button class="action" @click="removeImage()">Remove</button>
        <button class="action" @click="chooseImage()">Select</button>

        <small class="extra" v-if="removePic">Clicking save will remove your current profile picture. <span @click="cancelRemove()">Cancel this.</span> </small>

    </div>
</template>

<script>

    export default {
        props: ['pic', 'removePic'],

        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {

            },
        },

        methods: {
            setImage() {
                const file = this.$els.input.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                    this.$els.real.src = reader.result;
                };

                if (file) {
                    this.pic = file;
                    reader.readAsDataURL(file);
                } else {
                    this.pic = null;
                    this.$els.input.value = null;
                    this.$els.pic.style.backgroundImage = `url(${this.currentUser.profilePic})`;
                }
                this.removePic = false;
            },

            removeImage() {
                this.pic = null;
                this.$els.pic.style.backgroundImage = 'none';
                this.removePic = true;
            },

            chooseImage() {
                this.$els.input.click();
            },

            cancelRemove() {
                this.removePic = false;
                this.$els.pic.style.backgroundImage = `url(${this.currentUser.profilePic})`;
            },
        },

        ready() {
            this.$els.pic.style.backgroundImage = `url(${this.currentUser.profilePic}`;
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .profile-uploader {
        margin-bottom: 15px;
        @include clearfix;

        > .extra {
            color: $gray-light;
            display: block;
        }

        > .action {
            width: 105px;
            border: none;
            display: inline-block;
            margin: 0;
            padding: 5px 8px;
            font-size: .9rem;
            background-color: $gray-lighter;
            border-bottom: 1px solid $blue;
            border-top: 1px solid $blue;
            float: left;
            transition: $all-fast;

            &:last-child {
                border-left: 1px solid $blue;
            }

            &:hover {
                cursor: pointer;
                background-color: darken($gray-lighter, 10%);
            }
        }

        > .image {
            width: 210px;
            height: 170px;
            background-color: $gray-lighter;
            position: relative;
            background-size: cover;
            background-position: center center;
            overflow: hidden;

            > .realimg {
                height: 100%;
                left: 50%;
                transform: translateX(-50%);
                position: absolute;
            }

            > .uploader {
                width: 100%;
                height: 100%;
                position: absolute;
                opacity: 0;
            }
        }
    }
</style>
