<template>
    <tbody class="game-body">
        <tr class="game-row" @click="open">
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
        </tr>
        <tr is="game-row-edit" :game="game" :opened="opened"></tr>
    </tbody>
</template>

<script>
    import GameRowEdit from 'component/GameRowEdit';

    export default {
        props: ['game', 'display'],

        components: {
            GameRowEdit,
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
</style>
