<template>
    <div class="profile-banner">
        <!--
            TODO: Figure a way to load dynamic assets, possibly the router is getting in the way
            <img :src="banner" />
        -->
        <img src="../assets/banner/1500x500.png" />
    </div>
</template>

<script>
    export default {
        data () {
            return {
                banner: '../assets/banner/1500x500.png'
            }
        }
    }
</script>

<style lang="sass">

</style>
