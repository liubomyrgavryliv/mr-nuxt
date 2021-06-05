<template>
    <v-row dense no-gutters align="center" justify="center">
        <v-col cols="12">
            <div
                v-if="$fetchState.pending"
                class="d-flex justify-center align-center"
                :style="`width: 100%; height: ${height}px;`"
            >
                <v-progress-circular
                    indeterminate
                    color="background"
                    :width="2"
                ></v-progress-circular>
            </div>
            <p v-else-if="$fetchState.error">
                Error while fetching countries from API
            </p>
            <div v-else>
                <v-container fluid>
                    <v-row dense no-gutters>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <LazySelectSingle
                                v-model="centerOn"
                                :items="regionCenters"
                                item-text-key="region"
                                item-value-key="region"
                                label="Select region"
                                hint="Choose a region"
                            ></LazySelectSingle>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6">
                            <ControlCard :hover-data="hovered"></ControlCard>
                        </v-col>
                    </v-row>
                    <div :style="{ position: 'relative' }">
                        <svg
                            id="svgRef"
                            ref="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            :viewBox="`0 0 ${width} ${height}`"
                        >
                            <!-- <rect class="map-background" :width="width" :height="height"></rect> -->
                            <g id="gRef">
                                <g
                                    ref="gRef"
                                    :width="width"
                                    :height="height"
                                    :transform="`translate(0, 10)`"
                                >
                                    <rect
                                        :style="{ fill: 'transparent' }"
                                        width="100%"
                                        height="100%"
                                    ></rect>
                                    <g
                                        v-for="(country, index) in countryData"
                                        :key="index"
                                        @mouseover="
                                            mouseoverPath($event, country)
                                        "
                                        @mouseout="mouseoutPath($event)"
                                    >
                                        <path
                                            :d="pathGenerator(country.feature)"
                                            :fill="country.color"
                                            :class="{
                                                'country-preselected':
                                                    country.highlight,
                                            }"
                                        ></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <LegendBar
                            :color-scale="colorScale"
                            :legend-items="legendItems"
                            :width="40"
                            :height="5"
                        ></LegendBar>
                    </div>
                </v-container>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import * as d3 from 'd3'
import ControlCard from '@/components/maps/widgets/ControlCard'
import { mapGetters } from 'vuex'
import LegendBar from '../widgets/LegendBar'
const getGeoJson = async () => {
    try {
        return await import('~/static/custom.geo.json').then(
            (d) => d.default || d
        )
    } catch (err) {
        console.log(err)
        return []
    }
}
export default {
    name: 'CountryMap',
    components: {
        ControlCard,
        LegendBar,
    },
    props: {
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
        selectedCountry: {
            type: [Array, Object],
            default: () => [],
        },
    },
    async fetch() {
        // await this.$axios
        //   .$get('/api/stats/discovery_country_counts')
        //   .then((response) => {
        //     console.log(response)
        //     this.discoveryCountryCounts = response
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        await this.$store.dispatch('stats/fetchDiscoveryCountryCounts')
    },
    data() {
        return {
            mapJson: [],
            translateX: 0,
            translateY: 0,
            mapScale: 80,
            center: [0, 0],
            regionCenters: [
                { region: 'World', coordinates: [0, 0], mapScale: 80 },
                { region: 'Europe', coordinates: [10, 50], mapScale: 280 },
            ],
            centerOn: { region: 'World', coordinates: [0, 0], mapScale: 80 },
            hovered: {
                state: false,
                country: '',
                count: null,
            },
            legend: [
                { id: 1, count: 100, legend: '0 - 100' },
                { id: 2, count: 200, legend: '100 - 200' },
                { id: 3, count: 300, legend: '200 - 300' },
                { id: 4, count: 400, legend: '300 - 400' },
                { id: 5, count: 500, legend: '400 - 500' },
                { id: 6, count: 700, legend: '500 - 700' },
                { id: 7, count: 900, legend: '700 - 900' },
                { id: 8, count: 1100, legend: '> 1100' },
            ],
        }
    },
    computed: {
        projection() {
            const center = this.getCenter
            return d3
                .geoEquirectangular() // a projection function that converts from a lon/lat point to an x/y point
                .scale(center.mapScale) // .scale(this.width/7) // scale a projection, eg zoom in/out. The default scale factor on a projection is 150, so a scale of 450 is three times zoomed in and so on
                .translate([this.translateX, this.translateY]) // set the x/y value for the center (lon/lat) point of the map
                .center(center.coordinates)
        },
        legendItems() {
            this.legend.forEach((element) => {
                element.color = this.colorScale(element.count)
            })
            return this.legend
        },
        getCenter() {
            return this.centerOn
        },
        pathGenerator() {
            return d3.geoPath().projection(this.projection)
        },
        colorScale() {
            return d3
                .scaleLinear()
                .range(['#E1F5FE', '#01579B'])
                .domain(
                    d3.extent([
                        d3.min(this.discoveryCountryCounts, function (d) {
                            return d.mineral_count
                        }),
                        d3.max(this.discoveryCountryCounts, function (d) {
                            return d.mineral_count
                        }),
                    ])
                )
        },
        countryData() {
            return this.discoveryCountryCounts.length > 0
                ? this.mapJson.map((feature) => {
                      const country = this.discoveryCountryCounts.find(
                          (country) =>
                              country.country_iso === feature.properties.iso_a3
                      )
                      const output = {}
                      const counts = country ? country.mineral_count : 0
                      output.feature = feature
                      output.count = counts
                      output.color = this.colorScale(counts)
                      output.highlight = !!this.highlightCountry.find(
                          (d) => d === feature.id
                      )
                      return output
                  })
                : []
        },
        highlightCountry() {
            if (this.selectedCountry)
                return this.selectedCountry.map((d) => d.country_iso)
            else return []
        },
        ...mapGetters({
            discoveryCountryCounts: 'stats/getDiscoveryCountryCounts',
        }),
    },
    watch: {},
    mounted() {
        this.translateX = this.width / 2
        this.translateY = this.height / 2
    },
    async created() {
        this.mapJson = await getGeoJson().then((d) => d.features)
        console.log(this.mapJson)
    },
    updated() {},
    methods: {
        mouseoverPath(event, layer) {
            d3.select(event.target).classed('country-hover', true)
            // console.log(layer)
            this.hovered.state = true
            this.hovered.country = layer.feature.properties.name_long
            this.hovered.count = layer.count
        },
        mouseoutPath(event) {
            d3.select(event.target).classed('country-hover', false)
            this.hovered.country = ''
            this.hovered.count = null
            this.hovered.state = false
        },
    },
}
</script>
<style scoped>
g > path {
    stroke: var(--v-accent-base);
    stroke-width: 0.2px;
}

.country-hover {
    opacity: 0.8;
    stroke-width: 1px;
}

.country-preselected {
    stroke: magenta;
}

.map-background {
    fill: var(--v-background-lighten4);
    rx: 4px;
}
</style>
