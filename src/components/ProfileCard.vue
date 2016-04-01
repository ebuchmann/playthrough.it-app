<template>
    <div class="profile-card">

        <div class="profile-image">
            <img src="../assets/portrait.jpg" alt="{{ currentUser.username }}" />
        </div>

        <p class="username">{{ currentUser.username }}</p>

        <p><strong>Info</strong></p>
        <i class="fa fa-calendar"></i> Joined 3 days ago<br />
        <i class="fa fa-envelope"></i> me@ebuchmann.com<br /><br />

        <hr />

        <p><strong>Authenticated with:</strong></p>
        <div class="auth-with">
            <i class="fa fa-twitch"></i> Connected with Twitch <i class="fa fa-check true"></i>
        </div>
        <div class="auth-with">
            <i class="fa fa-facebook"></i> Not connected with Facebook <i class="fa fa-check false"></i>
        </div>
        <div class="auth-with">
            <i class="fa fa-twitter"></i> Connected with Twitter <i class="fa fa-check true"></i>
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
    };
</script>

<style lang="sass">
    @import '../css/includes';
    $padding: 30px;

    .profile-card {
        background-color: #fff;
        padding: $padding;
        box-shadow: $light-shadow;

        > .username {
            font-size: 2rem;
            margin-bottom: 1em;
        }

        > hr {
            margin: 0 0 - $padding;
        }
    }

    .profile-image {
        margin: - $padding;
        margin-bottom: $padding;
        overflow: hidden;
        height: 240px;

        > img {
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
            position: relative;
        }
    }

    .auth-with {
        padding: 8px 0;

        @include clearfix;

        & .fa {
            font-size: 1.2rem;
        }
        > .fa-twitch, > .fa-facebook, > .fa-twitter {
            float: left;
            width: 32px;
            height: 32px;
        }
        > .fa-twitch {
            color: $twitch-color;
        }
        > .fa-facebook {
            color: $facebook-color;
        }
        > .fa-twitter {
            color: $twitter-color;
        }

        > .fa-check {
            float: right;
        }

        > .true {
            color: $green;
        }
        > .false {
            color: $gray-light;
        }
    }
</style>
