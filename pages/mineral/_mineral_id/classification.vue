<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col class="ma-0 pa-0">
                <v-card
                    outlined
                    class="fill-height overflow-y-auto"
                    max-height="60vh"
                >
                    <div
                        v-for="classification in mineralClassification"
                        :key="classification.type"
                    >
                        <LazyMineralTabsClassificationNickelStrunz
                            v-if="classification.type == 'ns'"
                        ></LazyMineralTabsClassificationNickelStrunz>
                        <LazyMineralTabsClassificationGroups
                            v-if="classification.type == 'groups'"
                        ></LazyMineralTabsClassificationGroups>
                        <v-divider class="mx-2"></v-divider>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Classification',
    props: {},
    async fetch() {
        const { store, error, params } = this.$nuxt.context
        try {
            await store.dispatch(
                'mineral/fetchMineralClassification',
                params.mineral_id
            )
        } catch (e) {
            return error({ message: e.message, statusCode: e.response })
        }
    },
    data() {
        return {
            active: [],
            open: [],
        }
    },
    computed: {
        ...mapGetters({
            mineralClassification: 'mineral/getMineralClassification',
        }),
    },
    watch: {},
    methods: {},
}
</script>
<style scoped></style>
