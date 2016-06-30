<template>
    <div class="activity-item">

        <div class="activity-feed">
            <div class="item positive">
                <i class="fa fa-check-circle-o"></i> ebuchmann completed: Star Wars, NES <span class="date">Jan 12th, 2016</span>
            </div>
            <div class="item negative">
                <i class="fa fa-times-circle"></i> morrimoo rejected suggestion: Plok, SNES <span class="date">Jan 6th, 2016</span>
            </div>
            <div class="item suggestion">
                <i class="fa fa-gamepad"></i> robster85 suggested: Plok, SNES <span class="date">Jan 5th, 2016</span>
            </div>
            <div class="item positive">
                <i class="fa fa-check-circle-o"></i> shor8bit completed: Star Tropics, NES <span class="date">Jan 2nd, 2016</span>
            </div>
            <div class="item neutral">
                <i class="fa fa-check-circle-o"></i> TheMexicanRunner added: Home Alone, NES <span class="date">Dec 29th, 2015</span>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
    };
</script>

<style lang="sass">
    @import '../css/includes';

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
</style>
