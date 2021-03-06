<template>
    <div>
        <general-modal :show="opened" :width="'500px'" @click="setState('loginModal', false)">
            <div class="login-modal" @click.stop>
                <div :class="['busy', { active: loggingIn }]"></div>
                <i class="close fa fa-times" @click="setState('loginModal', false)"></i>
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
    import { setState } from 'store/state/actions';

    export default {
        data() {
            return {
                loggingIn: false,
            };
        },

        vuex: {
            actions: {
                getCurrentUser,
                setState,
            },
            getters: {
                opened: ({ state }) => state.loginModal,
            },
        },

        components: {
            GeneralModal,
        },

        methods: {
            doLogin(type) {
                this.loggingIn = true;
                const popup = window.open(`http://localhost:3033/auth/${type}`, 'Login to PlayThrough.it', 'scrollbars=yes,width=650,height=500');

                this._oauthInterval = window.setInterval(() => {
                    if (popup.closed) {
                        window.clearInterval(this._oauthInterval);

                        this.getCurrentUser();
                        this.loggingIn = false;
                        this.setState('loginModal', false);
                    }
                }, 200);
            },
        },

        events: {
            'close-modal'() {
                debug('closing');
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

        > .busy {
            position: absolute;
            width: 0;
            height: 0;
            top: 0;
            left: 0;
            background: none;
            transition: background .2s ease-in;

            &.active {
                width: 100%;
                height: 100%;
                background: rgba($gray, .45);
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
            padding: 16px 0 0 0;
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
