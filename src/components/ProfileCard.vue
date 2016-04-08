<template>
    <div class="profile-card">

        <div class="profile-image">
            <img src="../assets/portrait.jpg" alt="{{ currentUser.username }}" />
        </div>

        <p v-if="!editName" class="username canedit" @click="doEditName()">{{ currentUser.username }}</p>
        <div v-else class="edit-name">
            <input :value="currentUser.username" @keyup.enter="doSaveName" @keyup.esc="editName = !editName" />
            <button>Cancel</button>
            <button>Save</button>
        </div>


        <p><strong>Info</strong></p>
        <i class="fa fa-calendar"></i> Joined 3 days ago<br />
        <span v-if="!editEmail" class="canedit" @click="doEditEmail()">
            <i class="fa fa-envelope"></i> {{ currentUser.email }}<br /><br />
        </span>
        <div v-else class="edit-email">
            <input :value="currentUser.email" @keyup.enter="doSaveEmail" @keyup.esc="editEmail = !editEmail" />
            <button>Cancel</button>
            <button>Save</button>
        </div>

        <hr />

        <p><strong>Authenticated with:</strong></p>

        <div class="auth-with" v-for="auth in authTypes">
            <template v-if="currentUser[auth]">
                <i class="fa fa-{{auth}}"></i> Connected with {{ auth | capitalize}} <i class="fa fa-check true"></i>
            </template>
            <template v-else>
                <i class="fa fa-{{auth}}"></i> Not connected with {{ auth | capitalize}} <i class="fa fa-check false"></i>
                <button @click="doLogin(auth)">test</button>
            </template>
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
                authTypes: ['twitch', 'facebook', 'twitter'],
                editName: false,
                editEmail: false,
            };
        },

        methods: {
            doLogin(type) {
                const popup = window.open(`http://localhost:3033/connect/${type}`, 'Associate a new account with PlayThrough.it', 'scrollbars=yes,width=650,height=500');

                this._oauthInterval = window.setInterval(() => {
                    if (popup.closed) {
                        window.clearInterval(this._oauthInterval);

                        this.getCurrentUser();
                        this.toggle();
                    }
                }, 200);
            },

            doEditName() {
                this.editName = !this.editName;
                setTimeout(() => {
                    this.$el.querySelector('.edit-name > input').focus();
                }, 30);
            },

            doEditEmail() {
                this.editEmail = !this.editEmail;
                setTimeout(() => {
                    this.$el.querySelector('.edit-email > input').focus();
                }, 30);
            },

            doSaveEmail() {
                const email = this.$el.querySelector('.edit-email > input').value;
                debug(`Saving email as ${email}`);
                this.updateUser({ email });
                this.editEmail = !this.editEmail;
            },

            doSaveName() {
                const username = this.$el.querySelector('.edit-name > input').value;
                debug(`Saving name as ${username}`);
                this.updateUser({ username }).then(() => {
                    this.editName = !this.editName;
                });
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

    .edit-name {

        > input {
            font-size: 2rem;
            border: none;
            border-bottom: 1px solid black;
            width: 100%;
            outline: none;
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

    .canedit {
        cursor: pointer;

        &:hover {
            background-color: rgba($yellow, .1);
        }
    }
</style>
