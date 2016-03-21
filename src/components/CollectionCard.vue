<template>
    <a v-link="{ name: 'single_collection', params: { collectionId: collection._id} }">
        <div class="collection-card">
            <div class="top">
                <div class="left">
                    <h2 class="title">{{ collection.title }}</h2>
                    <p class="owner">by {{ collection.user.username }}</p>
                </div>
                <div class="right">
                    <div class="c100 center p{{parseInt(percent)}} ">
                        <span>{{percent}}%</span>
                        <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                        </div>
                    </div>
                    <p class="total">
                        {{ collection.completed }} of {{ collection.games }} games
                    </p>
                </div>
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
        margin: 30px 0;
        box-shadow: $light-shadow;
        transition: $all-medium;

        &:hover {
            cursor: pointer;
            box-shadow: $medium-shadow;
        }

        > .top {
            padding: 15px;
            @include clearfix;

            > .left {
                @include span(8 of 12);

                > .title {
                    color: $dark;
                    word-wrap: break-word;
                }

                > .owner {
                    font-style: italic;
                    color: $dark;
                }
            }
            > .right {
                @include span(4 of 12 last);

                > .c100 {
                    margin-top: -40px;
                }

                > .total {
                    margin: 10px 0 0 0;
                    font-size: .8rem;
                    text-align: center;
                }
            }
        }

        > .bottom {
            padding: 15px;
            background-color: $blue;
            color: #fff;
            display: flex;
            align-items: center;
            border-top: 2px solid $blue-dark;

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
