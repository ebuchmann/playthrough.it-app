<template>
    <div class="vue-app" @click="close">

        <login-modal></login-modal>
        <popup-notification></popup-notification>

        <div :class="['top-nav-wrapper', { small: smallHeader }]">
            <div class="container">
                <nav class="top-nav">
                    <a class="link" v-link="'/'">
                        <img class="logo" width="200px" src="http://localhost:3033/img/playthrough.it.svg" alt="Play Through It : Logo" />
                    </a>

                    <div class="top-links">
                        <a v-link="{ name: 'home' }">Home</a>
                        <a v-link="{ name: 'collections' }">Collections</a>
                        <click-menu v-if="currentUser" class="user-link">
                            <span slot="menu" class="menu"> {{ currentUser.username }}</span>
                            <div slot="content" class="top-menu-dropdown">
                                <a v-link="{ name: 'collections' }">Collections</a>
                                <a v-link="{ name: 'profile' }">Profile</a>
                                <a v-link="{ name: 'userProfile' }">Your Profile</a>
                                <a href="#" @click="doLogout()">Logout</a>
                            </div>
                        </click-menu>
                        <a v-else @click="setState('loginModal', true)">Login</a>
                    </ul>
                </nav>
            </div>
        </div>

        <router-view></router-view>

        <footer>
            <img class="icon" src="http://localhost:3033/img/footer.png" />
            <p class="copyright">&copy;{{ new Date().getFullYear() }} PlayThrough.it</p>
        </footer>
    </div>
</template>

<script>
    import store from 'store/store';
    import LoginModal from 'component/LoginModal';
    import ClickMenu from 'component/ClickMenu';
    import PopupNotification from 'component/PopupNotification';
    import { logout } from 'store/users/actions';
    import { setState } from 'store/state/actions';

    export default {
        store,

        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                logout,
                setState,
            },
        },

        components: {
            LoginModal,
            ClickMenu,
            PopupNotification,
        },

        data() {
            return {
                smallHeader: false,
            };
        },

        methods: {
            close() {
                this.$broadcast('hide::dropdown');
            },
            doLogout() {
                this.logout();
                this.$router.go({ name: 'home' });
            },
        },
    };
</script>

<style lang="sass">
    @import './src/css/app';

    footer {
        min-height: 50px;
        position: relative;
        margin: 35px 20px;

        &::before {
            content: '';
            height: 2px;
            width: 100%;
            background-color: #a9a9a9;
            position: absolute;
            top: 20px;
            margin-right: 15px;
        }

        > .icon {
            margin: 0 auto;
            display: block;
            position: relative;
        }

        > .copyright {
            font-size: .7rem;
            font-style: italic;
        }
    }
</style>
