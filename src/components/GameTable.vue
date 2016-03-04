<template>
    <div class="game-list">

        <p>{{ finished }} of {{ totalGames }} games complete!</p>

        <table class="game-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Platform</th>
                    <th>Genre</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody is="game-row" v-for="game in games" :game="game"></tbody>
        </table>

    </div>
</template>

<script>
    import GameRow from './GameRow'

    export default {
        vuex: {
            state: {
                games: store => store.games.current
            },
            actions: {

            }
        },

        components: {
            GameRow
        },

        computed: {
            totalGames () {
                return this.games.length
            },

            finished () {
                return this.games.filter(game => {
                    return game.status === 'Finished'
                }).length
            }
        }
    }
</script>

<style lang="sass">
    @import '../css/variables';

    .game-list {

    }

    .game-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;

        > thead {
            background-color: $blue;
            color: #fff;
            padding: 8px 0;

            > tr th {
                padding: .7rem 0;
                border-top: 1px solid #ddd;
                color: #fff;
            }
        }

        > tbody {
            > tr:nth-child(even) {

            }
        }
    }

</style>
