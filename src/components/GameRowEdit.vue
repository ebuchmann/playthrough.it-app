<template>
    <tr class="edit-row" :class="['edit-row', { opened: opened }]">
        <td colspan="100%">
            <div v-show="opened" transition="expand">
                <div class="inner">
                    <div class="col-1">
                        <label>Status</label>
                        <ul class="status-menu">
                            <li class="status-button -finished {{ game.status === 'Finished' ? 'selected' : ''}}" @click="changeStatus('Finished')"></li>
                            <li class="status-button -unfinished {{ game.status === 'Unfinished' ? 'selected' : ''}}" @click="changeStatus('Unfinished')"></li>
                            <li class="status-button -abandoned {{ game.status === 'Abandoned' ? 'selected' : ''}}" @click="changeStatus('Abandoned')"></li>
                            <li class="status-button -inprogress {{ game.status === 'In Progress' ? 'selected' : ''}}" @click="changeStatus('In Progress')"></li>
                            <li class="status-button -upnext {{ game.status === 'Up Next' ? 'selected' : ''}}" @click="changeStatus('Up Next')"></li>
                        </ul>
                    </div>

                    <div class="col-5">

                        <date-picker :value.sync="completed_on"></date-picker>

                        <input-box
                            :value.sync="deaths"
                            :event="updateItem"
                            :id="game._id"
                            style="side-input"
                            label="Deaths"
                            property="deaths"
                            type="text"
                            >
                        </input-box>



                        <input-box
                            :value.sync="time"
                            :event="updateItem"
                            :id="game._id"
                            style="side-input"
                            label="Time"
                            property="time"
                            type="text"
                            >
                        </input-box>



                        <input-box
                            :value.sync="rating"
                            :event="updateItem"
                            :id="game._id"
                            style="side-input"
                            label="Rating"
                            property="rating"
                            type="text"
                            >
                        </input-box>

                    </div>

                    <div class="col-6-last">

                        <input-box
                            :value.sync="winning"
                            :event="updateItem"
                            :id="game._id"
                            style="stacked-input"
                            label="Winning Condition"
                            property="winning"
                            type="textarea"
                            >
                        </input-box>

                        <input-box
                            :value.sync="comment"
                            :event="updateItem"
                            :id="game._id"
                            style="stacked-input"
                            label="Comment"
                            property="comment"
                            type="textarea"
                            >
                        </input-box>

                    </div>

                    <i class="fa fa-times-circle dodelete" @click="doDelete"></i>

                    <div class="is-deleting" v-show="isDeleting">
                        Are you sure you want to delete this?<br />
                        <span @click="doDelete">Yes, delete this</span> | <span @click="isDeleting = false">No, don't delete this</span>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    import numeral from 'numeraljs';
    import DatePicker from 'component/DatePicker';
    import InputBox from 'component/InputBox';

    import { removeGame, updateItem } from 'store/items/actions';

    export default {
        props: ['opened', 'game'],

        data() {
            return {
                rating: this.game.rating,
                deaths: this.game.deaths,
                comment: this.game.comment,
                winning: this.game.winning,
                time: numeral(this.game.time).format('00:00:00'),
                isDeleting: false,
                completed_on: this.game.completed_on,
            };
        },

        components: {
            DatePicker,
            InputBox,
        },

        vuex: {
            getters: {
                collectionId: ({ route }) => route.params.collectionId,
            },
            actions: {
                removeGame,
                updateItem,
            },
        },

        methods: {
            changeStatus(status) {
                this.updateItem(this.game._id, { status });
            },

            updateGameItem(property) {
                this.updateItem(this.game._id, property);
            },

            doDelete() {
                if (!this.isDeleting) this.isDeleting = !this.isDeleting;
                else {
                    const completed = this.game.status === 'Finished' ? -1 : 0;
                    this.removeGame(this.game._id, this.collectionId, completed);
                }
            },
        },

        events: {
            'date-picker'() {
                this.updateGameItem({ completed_on: this.completed_on });
            },
            'send-update'(property, value, element) {
                element.disabled = true;
                this.updateItem(this.game._id, { [property]: value }).then(() => {
                    element.disabled = false;
                    element.classList.add('success');
                    setTimeout(() => {
                        element.classList.remove('success');
                    }, 5000);
                });
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .col-1 {
        @include span(1 of 12);
    }
    .col-5 {
        @include span(5 of 12);
    }
    .col-6-last {
        @include span(6 of 12 last);
    }

    .edit-row {
        border-top: 1px solid $gray-light;
        border-left: 4px solid transparent;
        transition: $all-fast;

        &.opened {
            border-left: 4px solid rgba($blue, .25);
        }

        > td {
            padding: 0;
        }

        .inner {
            padding: 20px;
            position: relative;
            @include clearfix;
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
            display: block;
            cursor: pointer;
            background: #fff;
            width: 40px;
            text-align: center;
        }

        > .status-button {
            opacity: .55;
            border: 3px solid transparent;
            border-radius: 3px;
            transition: $all-medium;
            margin-bottom: 5px;
            border: 2px solid transparent;

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

    .dodelete {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 90;
        color: $red;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .is-deleting {
        z-index: 100;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($red, .9);
        top: 0;
        left: 0;
        font-size: 2rem;
        color: #fff;
        text-align: center;
        padding: 20px;

        > span {
            font-size: 1.5rem;
            cursor: pointer;

            &:hover {
                color: $blue;
            }
        }
    }

    /* always present */
    .expand-transition {
        background-color: #fff;
        overflow: hidden;
        max-height: 2000px;
        transition: all .3s cubic-bezier(0.5, 0, 1, 0);
    }

    /* .expand-enter defines the starting state for entering */
    /* .expand-leave defines the ending state for leaving */
    .expand-enter, .expand-leave {
        max-height: 0;
        transition: all .3s cubic-bezier(0, 1, 0, 1);
    }

</style>
