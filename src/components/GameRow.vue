<template>
    <tbody class="game-body">
        <tr :class="['game-row', { opened: opened }]">
            <td class="icon -{{ game.status | lowercase | stripSpaces }}">
                <i class="fa"></i>
            </td>
            <td>{{ game.game.title }}</td>
            <td v-if="display.platform">{{ game.game.platform }}</td>
            <td v-if="display.genres">{{ game.game.genres | genre }}</td>
            <td v-if="display.time">{{ game.time | time }}</td>
            <td v-if="display.date">{{ game.completed_on | date }}</td>
            <td v-if="display.rating">{{ game.rating }}</td>
            <td v-if="display.deaths">{{ game.deaths }}</td>
            <td class="menu">
                <popup-menu>
                    <i class="fa fa-bars"></i>
                    <ul class="menu">
                        <li @click="opened = !opened">Edit Game</li>
                        <li @click="test('b')">Remove Game</li>
                    </ul>
                </popup-menu>
            </td>
        </tr>
        <tr v-if="currentUser._id === user_id" is="game-row-edit" :game="game" :opened="opened"></tr>
    </tbody>
</template>

<script>
    import GameRowEdit from 'component/GameRowEdit';
    import PopupMenu from 'component/PopupMenu';

    export default {
        props: ['game', 'display', 'user_id'],

        vuex: {
            getters: {
                currentUser: ({ users }) => users.currentUser,
            },
        },

        components: {
            GameRowEdit,
            PopupMenu,
        },

        data() {
            return {
                opened: false,
            };
        },

        methods: {
            open() {
                this.opened = !this.opened;
            },

            test(val) {
                debug(val);
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .game-row {
        padding: 0;
        position: relative;
        background-color: $gray-lighter;
        cursor: pointer;
        border-left: 4px solid transparent;
        transition: $all-fast;

        > .menu {
            text-align: center;

            &:hover {
                background: $gray-light;
            }
        }

        &.opened {
            border-left: 4px solid $blue;
        }

        > td {
            padding: 0;
            margin: 0;
            display: table-cell;
        }

        > .icon {
            font-size: 1.6rem;
            padding: 0;
            cursor: pointer;
            position: relative;
            width: 44px;

            &.-finished {
                color: $green;

                > .fa::before {
                    content: '\f05d';
                }
            }
            &.-unfinished {
                color: $yellow;

                > .fa::before {
                    content: '\f06a';
                }
            }
            &.-abandoned {
                color: $red;

                > .fa::before {
                    content: '\f057';
                }
            }
            &.-inprogress {
                color: $blue;

                > .fa::before {
                    content: '\f11b';
                }
            }
            &.-upnext {
                color: $blue-dark;

                > .fa::before {
                    content: '\f093';
                }
            }
        }
    }
</style>
