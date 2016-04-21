<template>
    <div class="user-profile ">

        <div class="container">
            <div class="profile-left">
                <profile-card></profile-card>
            </div>
            <div class="profile-right">


                <context-menu :sub-pages.sync="subPages"></context-menu>

                <router-view></router-view>

                <h2 class="section-title">My collections <small>{{ collections.length }} of {{ currentUser.maxChallenges}} collections</small></h2>

                <div class="row">
                    <template v-for="collection in collections">
                        <div class="col-3">
                            <collection-card  :collection="collection"></collection-card>
                        </div>
                    </template>
                    <div class="col-3" v-if="collections.length < currentUser.maxChallenges">
                        <create-collection></create-collection>
                    </div>
                </div>


                <h2 class="section-title">Recent Activity</h2>

                <div class="activity-feed">
                    <div class="item positive">
                        <i class="fa fa-check-circle-o"></i> Completed: Star Wars, NES <span class="date">Jan 12th, 2016</span>
                    </div>
                    <div class="item negative">
                        <i class="fa fa-times-circle"></i> Rejected suggestion: Plok, SNES <span class="date">Jan 6th, 2016</span>
                    </div>
                    <div class="item suggestion">
                        <i class="fa fa-gamepad"></i> Morricane suggested: Plok, SNES <span class="date">Jan 5th, 2016</span>
                    </div>
                    <div class="item positive">
                        <i class="fa fa-check-circle-o"></i> Completed: Star Tropics, NES <span class="date">Jan 2nd, 2016</span>
                    </div>
                    <div class="item neutral">
                        <i class="fa fa-check-circle-o"></i> Added: Home Alone, NES <span class="date">Dec 29th, 2015</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ProfileCard from 'component/ProfileCard';
    import CollectionCard from 'component/CollectionCard';
    import CreateCollection from 'component/CreateCollection';
    import ContextMenu from 'component/ContextMenu';
    import { getUsersCollections } from 'store/collections/actions';

    export default {
        vuex: {
            getters: {
                collections: ({ collections }) => collections.collections,
                currentUser: ({ users }) => users.currentUser,
            },
            actions: {
                getUsersCollections,
            },
        },

        data() {
            return {
                subPages: [
                    { title: 'View Profile', name: 'userProfile' },
                    { title: 'Manage Profile', name: 'manageProfile' },
                ],
            };
        },

        computed: {
            unfinished() {
                if (this.collections.length) return this.collections.reduce((a, b) => a.games + b.games);
                return null;
            },
            finished() {
                if (this.collections.length) return this.collections.reduce((a, b) => a.completed + b.completed);
                return null;
            },
        },

        components: {
            ProfileCard,
            CollectionCard,
            CreateCollection,
            ContextMenu,
        },

        route: {
            data() {
                return this.getUsersCollections(this.currentUser._id);
            },
            canReuse: false,
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .user-profile {
        @include clearfix;
    }

    .profile {
        &-left {
            @include span(3 of 12);
        }
        &-right {
            @include span(9 of 12 last);
        }
    }

    .collection-stat-container {
        @include clearfix;
    }

    .activity-feed {
        background-color: #fff;
        box-shadow: $light-shadow;

        > .item {
            padding: 15px;
            border-bottom: 1px solid $gray-lighter;

            &:last-child {
                border-bottom: none;
            }

            > .fa {
                font-size: 1.5rem;
                padding-right: 10px;
            }

            > .date {
                float: right;
                font-size: .9rem;
                color: $gray-light;
            }
        }

        > .item.positive > .fa {
            color: $green;
        }

        > .item.neutral > .fa {
            color: $yellow;
        }

        > .item.negative > .fa {
            color: $red;
        }

        > .item.suggestion > .fa {
            color: $blue;
        }
    }

    .section-title {
        > small {
            float: right;
            font-size: 1rem;
        }
    }

    .add-collection {
        border: 2px dashed black;
        display: table;
        width: 100%;
        height: 150px;

        > h2 {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
        }
    }
</style>
