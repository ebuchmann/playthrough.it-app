<template>
    <a v-link="{ name: 'single_collection', params: { collectionId: collection._id} }">
        <div class="collection-card">
            <div class="top">
                <h2 class="title">{{ collection.title }}</h2>
                <div class="left">
                    <span class="total">
                        <strong>{{ collection.completed }} of {{ collection.games }}</strong><br />
                        games
                    </span>
                </div>
                <div class="right">
                    <strong>{{percent}}%</strong><br />
                    complete
                </div>
            </div>
            <div class="status">
                <div class="percentfull" :style="{ width: this.percent + '%' }"></div>
            </div>
            <div class="bottom">
                <span class="playing">Currently<br /> playing:</span>
                <span class="current">{{ collection.current || 'No game selected' }}</span>
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        props: ['collection'],

        computed: {
            percent() {
                return Math.round(10 * (this.collection.completed / this.collection.games * 100)) / 10 || 0;
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';
    @import '../css/mixins';
    @import '../../bower_components/susy/sass/susy';

    .collection-card {
        background-color: #fff;
        margin: 15px 0;
        box-shadow: $light-shadow;
        transition: $all-medium;
        color: $dark;

        &:hover {
            cursor: pointer;
            box-shadow: $medium-shadow;
        }

        > .top {
            min-height: 120px;
            padding: 15px;
            position: relative;
            @include clearfix;

            > .title {
                margin-bottom: 15px;
            }

            > .left, > .right {
                font-size: .9rem;
                position: absolute;
                bottom: 5px;
            }

            > .left {
                @include span(6 of 12);
            }

            > .right {
                text-align: right;
                right: 15px;
                @include span(6 of 12 last);
            }
        }

        > .status {
            height: 6px;
            width: 100%;
            background-color: $gray-lighter;

            > .percentfull {
                background-color: $blue-dark;
                height: 8px;
            }
        }

        > .bottom {
            padding: 15px;
            background-color: $blue;
            color: #fff;
            display: flex;
            align-items: center;

            @include clearfix;

            > .playing {
                text-align: right;
                float: left;
                font-size: .7rem;
                line-height: 1.2;
            }

            > .current {
                padding-left: 15px;
            }
        }
    }

</style>
