<template>
    <div class="login-modal {{activeLogin ? 'active' : ''}}">
        <p>Login form!!</p>
        <i @click="toggle" class="fa fa-times-circle"></i>
        <button @click="twitterLogin">Login with Twitter</button>
        <a href="http://localhost:3033/auth/twitter">Twitter...</a>
    </div>
</template>

<script>
    import { getCurrentUser } from 'store/users/actions';

    export default {
        data() {
            return {
                activeLogin: false,
            };
        },

        vuex: {
            getters: {

            },
            actions: {
                getCurrentUser,
            },
        },

        methods: {
            toggle() {
                this.activeLogin = !this.activeLogin;
            },

            twitterLogin() {
                const popup = window.open('http://localhost:3033/auth/twitter', 'Twitter', 'scrollbars=yes,width=650,height=500');

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

    .login-modal {
        width: 200px;
        height: 200px;
        left: 0;
        right: 0;
        margin: 0 auto;
        position: fixed;
        z-index: 100;
        border: 1px solid black;
        transform: translateY(-100%);
        transition: transform .15s ease-out;
        background: #fff;

        &.active {
            transform: translateY(0);
        }
    }

</style>
