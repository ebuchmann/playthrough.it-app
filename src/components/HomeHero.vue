<template>
    <div class="home-hero">

        <div class="cta">
            <h2 class="title">Log, track, and share your gaming progress.</h2>
            <p>playthrough.it helps you keep track of what you've beat and what you want to beat.</p>
            <button class="button -hero" @click="setState('loginModal', true)">Sign Up</button>
        </div>

    </div>
</template>

<script>
    import { setState } from 'store/state/actions';

    export default {
        vuex: {
            actions: {
                setState,
            },
        },
    };
</script>

<style lang="sass">
    @import '../css/includes';

    .home-hero {
        width: 100%;
        border-radius: 4px;
        padding: 60px;
        background-image: url('http://localhost:3033/img/hero.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        margin-bottom: 30px;
        color: #fff;

        @include clearfix;

        > .cta {
            @include span(5 of 12);

            > .title {
                font-size: 2.3rem;
                text-align: center;
                margin-bottom: 1.5em;
                line-height: 1.3;
            }

            > .-hero {
                font-size: 1.8rem;
                padding: .5em 2em;
                margin: 0 auto;
                display: block;
            }
        }
    }
</style>
