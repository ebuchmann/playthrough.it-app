<template>
    <tbody class="game-body">
        <tr class="game-row" @click="open">
            <td class="icon -{{ game.status | lowercase | stripSpaces }}">
                <i class="fa"></i>
            </td>
            <td>{{ game.name }}</td>
            <td v-if="tracking.platform_id.active">{{ game.platform_id }}</td>
            <td v-if="tracking.genres.active">{{ game.genres | genre }}</td>
            <td v-if="tracking.time.active">{{ game.time | time }}</td>
            <td v-if="tracking.date.active">{{ game.completed_on | date }}</td>
            <td v-if="tracking.rating.active">{{ game.rating }}</td>
            <td v-if="tracking.deaths.active">{{ game.deaths }}</td>
        </tr>
        <tr class="edit-row">
            <td colspan="100%">
                <div v-show="opened" transition="expand">
                    <div style="padding: 10px">
                        <label>Status</label>
                        <ul class="status-menu">
                            <li class="status-button -finished {{ game.status === 'Finished' ? 'selected' : ''}}" @click="changeStatus('Finished')"></li>
                            <li class="status-button -unfinished {{ game.status === 'Unfinished' ? 'selected' : ''}}" @click="changeStatus('Unfinished')"></li>
                            <li class="status-button -abandoned {{ game.status === 'Abandoned' ? 'selected' : ''}}" @click="changeStatus('Abandoned')"></li>
                            <li class="status-button -inprogress {{ game.status === 'In Progress' ? 'selected' : ''}}" @click="changeStatus('In Progress')"></li>
                            <li class="status-button -upnext {{ game.status === 'Up Next' ? 'selected' : ''}}" @click="changeStatus('Up Next')"></li>
                        </ul>
                        <label>Time</label>
                        <input v-model="time | time" @blur="updateTime" />
                        <label>Date</label>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script>
    import { setStatus, setTime } from '../vuex/actions';

    export default {
        props: ['game', 'tracking'],

        data() {
            return {
                opened: false,
                time: '',
            };
        },

        vuex: {
            getters: {

            },
            actions: {
                setStatus,
                setTime,
            },
        },

        methods: {
            changeStatus(status) {
                this.setStatus(this.$route.params.collection_id, this.game.id, status);
            },

            open() {
                this.opened = !this.opened;
            },

            updateTime() {
                this.setTime(this.game.id, this.time);
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .game-row {
        padding: 5px;
        position: relative;
        background-color: $gray-lighter;
        cursor: pointer;

        > .icon {
            font-size: 1.6rem;
            padding: 5px;
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

    .edit-row {
        border-top: 1px solid $gray-light;

        > td {
            padding: 0;
        }
    }

    .status-menu {
        list-style: none;
        bottom: 24px;
        font-size: 1.4rem;
        padding: 0;
        margin-bottom: 0;
        font-family: FontAwesome;

        > li {
            line-height: 40px;
            color: $dark;
            display: inline-block;
            cursor: pointer;
            background: #fff;
            width: 40px;
            text-align: center;
        }

        > .status-button {
            opacity: .55;
            border: 3px solid transparent;
            transition: $all-medium;

            &:hover {
                opacity: 1;
            }

            &.selected {
                box-shadow: $light-shadow;
            }
        }

        @each $status, $icon in $statuses {
            > .-#{$status} {
                &.selected {
                    border: 2px solid map-get($icon, color);
                    opacity: 1;
                }

                &::before {
                    content: map-get($icon, icon);
                    color: map-get($icon, color);
                }
            }
        }


    }

    /* always present */
    .expand-transition {
        background-color: #eee;
        overflow: hidden;
        max-height: 2000px;
        transition: all .3s cubic-bezier(0.5, 0, 1, 0);
        box-shadow: inset 0px 11px 8px -10px $gray-light,
                    inset 0px -11px 8px -10px $gray-light;
    }

    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter, .expand-leave {
        max-height: 0;
        transition: all .3s cubic-bezier(0, 1, 0, 1);
    }

</style>
