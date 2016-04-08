<template>
    <div class="user-card">

        <img src="../assets/portrait.jpg" alt="{{ currentUser.username }}" />

        <div class="auth-with" v-for="auth in authTypes">
            <template v-if="currentUser[auth]">
                <i class="fa fa-{{auth}}"></i> Connected with {{ auth | capitalize}} <i class="fa fa-check true"></i>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
        },

        data() {
            return {
                authTypes: ['twitch', 'facebook', 'twitter'],
            };
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .user-card {
        width: 150px;
        height: 150px;
        overflow: hidden;
        float: right;
        margin: -30px 0;

        > img {
            width: 150px;
            height: 150px;
        }
    }
</style>
