<template>
    <div class="vue-app" @click="close">

        <login-modal></login-modal>
        <popup-notification></popup-notification>

        <div class="top-nav-wrapper">
            <div class="container">
                <nav class="top-nav">
                    <a class="link" v-link="'/'">
                        <img class="logo" width="200px" src="assets/playthrough.it.svg" alt="Play Through It : Logo" />
                    </a>

                    <div class="top-links">
                        <a v-link="{ name: 'home' }">Home</a>
                        <a v-link="{ name: 'collections' }">Collections</a>
                        <click-menu v-if="currentUser" class="user-link">
                            <span slot="menu" class="button"> {{ currentUser.username }}</span>
                            <div slot="content" class="top-menu-dropdown">
                                <a v-link="{ name: 'collections' }">Collections</a>
                                <a v-link="{ name: 'profile' }">Profile</a>
                                <a v-link="{ name: 'userProfile' }">Your Profile</a>
                                <a href="#" @click="doLogout()">Logout</a>
                            </div>
                        </click-menu>
                        <a v-else @click="$broadcast('toggle::login-modal')">Login</a>
                    </ul>
                </nav>
            </div>
        </div>

        <router-view></router-view>

        <footer>
            <img class="icon" src="./assets/footer.png" />
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

    export default {
        store,

        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                logout,
            },
        },

        components: {
            LoginModal,
            ClickMenu,
            PopupNotification,
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

    #app {
        height: 100%;
    }

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
