<template>
    <div class="edit-profile">

        <div class="profile-row">
            <div class="l">
                <label>Username</label>
            </div>
            <div class="r">
                <template v-if="currentUser.canChangeName">
                    <input class="input" v-else v-model="username" />
                    <small class="extra">Your username can only be set one time, choose wisely!</small>
                </template>
                <p v-else>{{ currentUser.username }}</p>
            </div>
        </div>

        <div class="profile-row">
            <div class="l">
                <label>Email</label>
            </div>
            <div class="r">
                <input class="input" v-model="email" />
                <small class="extra" v-if="email !== currentUser.email">We will verify your email if you change it!</small>
            </div>
        </div>

        <div class="profile-row">
            <div class="l">
                Profile Picture
            </div>
            <div class="r">
                (uploader)
            </div>
        </div>

        <div class="profile-row">
            <div class="l">
                <label>Advertisements</label>
            </div>
            <div class="r">
                <label class="label">
                    <input class="checkbox" type="checkbox" v-model="viewAds" />
                    <span class="span"></span>
                    {{ viewAds }}
                </label>
                <small class="extra">Advertisements help pay for hosting and other fees releated to keeping this site running.</small>
            </div>
        </div>

        <div class="profile-row">
            <div class="l"></div>
            <div class="r">
                <button class="button" @click="update">Save</button>
            </div>
        </div>

    </div>
</template>

<script>
    import { updateUser } from 'store/users/actions';

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
            };
        },

        methods: {
            update() {
                const data = {
                    username: this.username,
                    email: this.email,
                    viewAds: this.viewAds,
                };

                debug(data);
                this.updateUser(data);
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

    .profile-row {
        @include clearfix;
        padding-bottom: 25px;

        > .l {
            @include span(2 of 12);
        }
        > .r {
            @include span(10 of 12 last);
            padding-left: 20px;
            border-left: 1px solid $gray-light;

            > .extra {
                color: $gray-light;
                display: block;
            }
        }
    }
</style>
