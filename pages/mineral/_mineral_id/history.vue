<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col class="ma-0 pa-0">
                <v-card outlined>
                    <v-card-text v-if="mineralHistory">
                        <div
                            v-if="mineralHistory.discovery_year"
                            class="font-weight-bold"
                        >
                            Discovery year:
                            <span class="font-weight-regular">{{
                                discoveryYear
                            }}</span>
                        </div>
                        <div
                            v-if="mineralHistory.first_usage_date"
                            class="font-weight-bold"
                        >
                            First usage date:
                            <span class="font-weight-regular">{{
                                mineralHistory.first_usage_date
                            }}</span>
                        </div>
                        <div
                            v-if="mineralHistory.first_known_use"
                            class="font-weight-bold"
                        >
                            First known use:
                            <span class="font-weight-regular">{{
                                mineralHistory.first_known_use
                            }}</span>
                        </div>
                        <div
                            v-if="mineralHistory.discovery_country"
                            class="font-weight-bold"
                        >
                            Discovery country(ies):
                            <span class="font-weight-regular">{{
                                discoveryCountry
                            }}</span>
                        </div>
                    </v-card-text>
                    <LazyVisualizationsWorldMapCountryMap
                        :width="500"
                        :height="220"
                        :selected-country="
                            mineralHistory
                                ? mineralHistory.discovery_country
                                : null
                        "
                    ></LazyVisualizationsWorldMapCountryMap>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'History',
    props: {},
    computed: {
        discoveryYear() {
            if (this.mineralHistory) {
                const note =
                    this.mineralHistory.discovery_year_note !== null
                        ? ` (${this.mineralHistory.discovery_year_note})`
                        : ''
                return `${this.mineralHistory.discovery_year}${note}`
            } else return null
        },
        discoveryCountry() {
            if (this.mineralHistory) {
                const countryChunks = this.mineralHistory.discovery_country.map(
                    (d) => {
                        const note = d.note ? ` (${d.note})` : ''
                        return `${d.country_name}${note}`
                    }
                )
                return countryChunks.join('; ')
            } else return null
        },
        ...mapGetters({
            mineralHistory: 'mineral/getMineralHistory',
        }),
    },
    methods: {},
}
</script>
<style scoped></style>
