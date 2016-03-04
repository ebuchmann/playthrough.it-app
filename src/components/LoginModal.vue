<template>
    <div class="login-modal {{activeLogin ? 'active' : ''}}">
        <p>Login form!!</p>
        <i @click="toggle" class="fa fa-times-circle"></i>
        <button @click="twitterLogin">Login with Twitter</button>
        <a href="http://localhost:3033/auth/twitter">Twitter...</a>
    </div>
</template>

<script>
    import { currentUser } from '../api/user';
    import { setUser } from '../vuex/actions';

    export default {
        data() {
            return {
                activeLogin: false,
            };
        },

        vuex: {
            state: {

            },
            actions: {
                setUser,
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

                        this.fetchUsername();
                        this.toggle();
                    }
                }, 200);
            },

            fetchUsername() {
                currentUser().then(res => {
                    setUser(res);
                }).catch(err => {
                    debug(err);
                });
            },
        },

        events: {
            'toggle::login-modal'() {
                this.toggle();
            },

            'login::check-user'() {
                this.fetchUsername();
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

        &.active {
            transform: translateY(0);
        }
    }

</style>
