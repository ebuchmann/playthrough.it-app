<template>
    <div class="home-page">
        
        <div class="container">
            <div class="left">
                {{ user | json }}
                <button @click="test">Test</button>
                Left
            </div>
            <div class="right">
                Right
            </div>
        </div>

    </div>
</template>

<script>
    import hub from '../../api/githubtest'

    export default {
        data () {
            return {
                user: 'before'
            }
        },

        methods: {
            test () {
                hub.getUser()
                    .then(res => {
                        this.user = res
                    })
            }
        },

        components: {
        }
    }
</script>

<style>
    .jumbotron {
        height: 500px;
    }
</style>
