<template>
    <div class="vue-app" @click="close">
<!--
        <login-modal></login-modal>
-->
        <div class="top-nav-wrapper">
            <div class="container">
                <nav class="top-nav">
                    <a class="link" v-link="'/'">
                        <img class="logo" width="200px" src="assets/playthrough.it.svg" alt="Play Through It : Logo" />
                    </a>

                    <div class="top-links">
                        <a v-link="{ name: 'collections' }">Collections</a>
                        <a v-link="{ name: 'profile' }">Profile</a>
                        <template v-if="username">
                            <click-menu class="user-link">
                                <span slot="menu" class="button"> {{ username }}</span>
                                <div slot="content" class="top-menu-dropdown">
                                    <a v-link="{ name: 'collections' }">Collections</a>
                                    <a v-link="{ name: 'profile' }">Profile</a>
                                </div>
                            </click-menu>
                        </template>
                        <a v-else @click="$broadcast('toggle::login-modal')">Login / Signup</a>
                    </ul>
                </nav>
            </div>
        </div>

        <router-view></router-view>

        <footer>

        </footer>
    </div>
</template>

<script>
    import store from './vuex/store';
    import LoginModal from './components/LoginModal';
    import ClickMenu from './components/ClickMenu';

    export default {
        store,
        vuex: {
            state: {

            },
            actions: {

            },
        },

        components: {
            LoginModal,
            ClickMenu,
        },

        computed: {
            username() {
                return 'ebuchmann';
            },
        },

        methods: {
            close() {
                debug('send close');
                this.$broadcast('hide::dropdown');
            },
            doOpen() {
                debug('aa');
            },
        },

        ready() {
            this.$broadcast('login::check-user');
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
        background: url(assets/footer.png) no-repeat center center;
        position: relative;
        margin: 15px 0;

        &::before {
            content: '';
            height: 2px;
            width: 47.5%;
            background-color: #a9a9a9;
            position: absolute;
            top: 22px;
            margin-right: 15px;
        }

        &::after {
            content: '';
            height: 2px;
            width: 47.5%;
            background-color: #a9a9a9;
            position: absolute;
            top: 22px;
            right: 0;
        }
    }
</style>
