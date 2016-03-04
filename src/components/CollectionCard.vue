<template>
    <a v-link="{ name: 'single_collection', params: { collection_id: collection.id} }">
        <div class="collection-card">
            <div class="top">
                <div class="left">
                    <h2 class="title">{{ collection.title }}</h2>
                    <p class="owner">by {{ collection.owner }}</p>
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
                <span class="current">{{ collection.current }}</span>
            </div>
        </div>
    </a>
</template>

<script>
    export default {
        computed: {
            percent() {
                return (this.collection.completed / this.collection.games * 100).toFixed(1);
            },
        },

        props: ['collection'],
    };
</script>

<style>

</style>
