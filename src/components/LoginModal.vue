<template>
    <div>
        <general-modal :show.sync="activeLogin" :width="'500px'">
            <div class="login-modal">
                <i class="close fa fa-times" @click="toggle"></i>
                <p class="logintext">Log In</p>

                <div class="login-buttons">
                    <span class="button -twitter" @click="doLogin('twitter')"></span>
                    <span class="button -twitch" @click="doLogin('twitch')"></span>
                    <span class="button -facebook" @click="doLogin('facebook')"></span>
                </div>

                <div class="bottom">
                    <p>Or create an account by choosing your log in method.</p>
                </div>
            </div>
        </general-modal>
    </div>
</template>

<script>
    import GeneralModal from 'component/GeneralModal';
    import { getCurrentUser } from 'store/users/actions';

    export default {
        data() {
            return {
                activeLogin: false,
            };
        },

        vuex: {
            actions: {
                getCurrentUser,
            },
        },

        components: {
            GeneralModal,
        },

        methods: {
            toggle() {
                this.activeLogin = !this.activeLogin;
            },

            doLogin(type) {
                const popup = window.open(`http://localhost:3033/auth/${type}`, 'Login to PlayThrough.it', 'scrollbars=yes,width=650,height=500');

                this._oauthInterval = window.setInterval(() => {
                    if (popup.closed) {
                        window.clearInterval(this._oauthInterval);

                        this.getCurrentUser();
                        this.toggle();
                    }
                }, 200);
            },
        },

        events: {
            'toggle::login-modal'() {
                this.toggle();
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .login-modal {
        padding: 40px;
        background-color: #fff;
        position: relative;

        > .logintext {
            text-align: center;
            font-weight: bold;
            font-size: 2rem;
        }

        > .close {
            position: absolute;
            top: 20px;
            right: 20px;
            color: $gray-light;
            cursor: pointer;
            font-size: 1.3rem;
        }

        > .bottom {
            margin: 40px -40px -40px -40px;
            background-color: $gray-lighter;
            padding: 20px;

            > p {
                margin-bottom: 0;
            }
        }
    }

    .login-buttons {
        > .button {
            width: 100px;
            height: 140px;
            display: inline-block;
            color: #fff;
            font-family: FontAwesome;
            font-size: 4rem;
            padding-top: 16px;
            text-indent: 18px;
            cursor: pointer;
            box-shadow: $light-shadow;
            margin: 0 15px;
            transition: $all-fast;

            &:hover {
                box-shadow: $medium-shadow;
            }

            &.-twitch {
                background-color: $twitch-color;

                &::after {
                    content: $icon-twitch;
                }
            }

            &.-facebook {
                background-color: $facebook-color;

                &::after {
                    content: $icon-facebook;
                }
            }

            &.-twitter {
                background-color: $twitter-color;

                &::after {
                    content: $icon-twitter;
                }
            }
        }
    }

</style>
