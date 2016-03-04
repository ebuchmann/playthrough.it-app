<template>
    <div class="game-list-create">
        <h2>Create a new mania</h2>
        <input v-model="title" @keypress.enter="addMania">

    </div>
</template>

<script>
    const { addGame } = store.actions

    export default {
        data () {
            return {
                title: ''
            }
        },

        methods: {
            addMania () {
                this.$http.post('http://localhost:3033/manias', {
                    title: 'blah'
                }).then(mania => {
                    console.log(mania)
                    // Send mania into store to list it
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="sass">

</style>
