<template>
    <div class="edit-profile">

        <div class="row">
            <div class="labels">
                <label>Username</label>
            </div>
            <div class="inputs">
                <template v-if="currentUser.canChangeName">
                    <input class="input" v-else v-model="username" />
                    <small class="extra">Your username can only be set one time, choose wisely!</small>
                </template>
                <p v-else>{{ currentUser.username }}</p>
            </div>
        </div>

        <div class="row">
            <div class="labels">
                <label>Email</label>
            </div>
            <div class="inputs">
                <input class="input" v-model="email" />
                <small class="extra" v-if="email !== currentUser.email">We will verify your email if you change it!</small>
            </div>
        </div>

        <div class="row">
            <div class="labels">
                Profile Picture
            </div>
            <div class="inputs">
                <profile-uploader :pic.sync="newPic" :remove-pic.sync="removePic"></profile-uploader>
            </div>
        </div>

        <div class="row">
            <div class="labels">
                <label>Advertisements</label>
            </div>
            <div class="inputs">
                <label class="label">
                    <input class="checkbox" type="checkbox" v-model="viewAds" />
                    <span class="span"></span>
                </label>
                <small class="extra">Advertisements help pay for hosting and other fees releated to keeping this site running.</small>
            </div>
        </div>

        <div class="row">
            <div class="labels"></div>
            <div class="inputs">
                <button class="button" @click="update">Save</button>
                <button class="button cancel">Cancel</button>
            </div>
        </div>

    </div>
</template>

<script>
    import ProfileUploader from 'component/ProfileUploader';
    import { updateUser } from 'store/users/actions';

    // import { pri } from '../api/api-config';
    // import axios from 'axios';

    export default {
        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                updateUser,
            },
        },

        data() {
            return {
                username: this.currentUser.username,
                email: this.currentUser.email,
                viewAds: this.currentUser.viewAds,
                newPic: null,
                removePic: false,
            };
        },

        components: {
            ProfileUploader,
        },

        methods: {
            update() {
                const formData = new FormData();

                formData.append('username', this.username);
                formData.append('email', this.email);
                formData.append('viewAds', this.viewAds);

                if (this.newPic) formData.append('img', this.newPic);
                else if (this.removePic) formData.append('img', this.removePic);

                this.updateUser(formData);
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .edit-profile {
        background: #fff;
        box-shadow: $light-shadow;
        margin: 25px 0;
        padding: 20px;
        border-bottom: 3px solid $blue;
    }
</style>
