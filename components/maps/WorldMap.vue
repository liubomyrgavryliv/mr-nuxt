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
            <div
                v-else
                id="mapContainer"
                :style="`height: ${height}px; width: 100%`"
            >
                <client-only>
                    <l-map
                        ref="map"
                        :zoom.sync="zoom"
                        :min-zoom="minZoom"
                        :center="center"
                        @ready="fitBounds"
                    >
                        <l-tile-layer
                            :url="url"
                            :attribution="attribution"
                        ></l-tile-layer>
                        <l-feature-group v-if="markers.length > 0">
                            <l-marker
                                v-for="(layer, index) in markers"
                                :key="index"
                                :lat-lng="layer.coordinates"
                            >
                                <l-popup>
                                    <template v-slot:default>
                                        <MarkerPopup
                                            :mineral-id="'sfsf'"
                                            :country="layer.country"
                                            :count="layer.count"
                                        ></MarkerPopup>
                                    </template>
                                </l-popup>
                            </l-marker>
                        </l-feature-group>
                        <l-feature-group ref="polygons" @ready="polygonsReady">
                            <l-polygon
                                v-for="(layer, index) in layers"
                                :key="index"
                                :type="layer.type"
                                :lat-lngs="layer.latlngs"
                                :color="layer.highlight ? 'black' : layer.color"
                                :fill="true"
                                :opacity="layer.highlight ? 0.5 : 0.2"
                                :fill-opacity="0.6"
                                :fill-color="layer.color"
                                :weight="1"
                                :smooth-factor="1"
                                @mouseover="mouseoverPolygon(layer, $event)"
                                @mouseout="mouseoutPolygon(layer, $event)"
                            >
                            </l-polygon>
                        </l-feature-group>
                        <l-control position="topright">
                            <template v-slot:default>
                                <ControlCard
                                    :country="hoveredLayerData.country"
                                    :count="hoveredLayerData.count"
                                    :hovered="hoveredLayer"
                                ></ControlCard>
                            </template>
                        </l-control>
                        <l-control position="bottomright">
                            <template v-slot:default>
                                <ControlLegend :colors="colors"></ControlLegend>
                            </template>
                        </l-control>
                    </l-map>
                </client-only>
            </div>
        </v-col>
    </v-row>
</template>
<script>
import * as d3 from 'd3'
import MarkerPopup from './widgets/MarkerPopup'
import ControlCard from './widgets/ControlCard'
import ControlLegend from './widgets/ControlLegend'
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
let Vue2Leaflet = {}
if (process.client) Vue2Leaflet = require('vue2-leaflet')
export default {
    name: 'WorldMap',
    components: {
        'l-map': Vue2Leaflet.LMap,
        'l-tile-layer': Vue2Leaflet.LTileLayer,
        'l-marker': Vue2Leaflet.LMarker,
        'l-popup': Vue2Leaflet.LPopup,
        'l-feature-group': Vue2Leaflet.LFeatureGroup,
        'l-polygon': Vue2Leaflet.LPolygon,
        'l-control': Vue2Leaflet.LControl,
        MarkerPopup,
        ControlCard,
        ControlLegend,
    },
    props: {
        height: {
            type: Number,
            required: true,
        },
        selectedCountry: {
            type: Array,
            default: () => [],
        },
    },
    async fetch() {
        await this.$axios
            .$get('/api/stats/discovery_country_counts')
            .then((response) => {
                console.log(response)
                this.discoveryCountryCounts = response
            })
            .catch((error) => {
                console.log(error)
            })
    },
    data() {
        return {
            mapJson: null,
            discoveryCountryCounts: [],
            layersStatic: [],
            url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            zoom: 1,
            minZoom: 1,
            center: [0, 0],
            bounds: null,
            markersExtent: [],
            markersStatic: [],
            hoveredLayer: false,
            hoveredLayerData: {
                country: '',
                count: null,
            },
            colors: [
                { id: 1, count: 100, color: '#E1F5FE', legend: '0 - 100' },
                { id: 2, count: 200, color: '#B3E5FC', legend: '100 - 200' },
                { id: 3, count: 300, color: '#81D4FA', legend: '200 - 300' },
                { id: 4, count: 400, color: '#4FC3F7', legend: '300 - 400' },
                { id: 5, count: 500, color: '#29B6F6', legend: '400 - 500' },
                { id: 6, count: 700, color: '#039BE5', legend: '500 - 700' },
                { id: 7, count: 900, color: '#0288D1', legend: '700 - 900' },
                { id: 8, count: 1100, color: '#01579B', legend: '> 1100' },
            ],
        }
    },
    computed: {
        colorScale() {
            return d3
                .scaleThreshold()
                .domain(this.colors.map((d) => d.count))
                .range(this.colors.map((d) => d.color))
        },
        highlightCountry() {
            return this.selectedCountry.map((d) => d.country_iso)
        },
        markers() {
            console.log(this.markersStatic)
            return this.markersStatic
        },
        layers() {
            const output = []
            if (this.mapJson)
                this.mapJson.map((feature) => {
                    const country = this.discoveryCountryCounts.find(
                        (country) =>
                            country.country_iso === feature.properties.iso_a3
                    )
                    const outputInner = {}
                    const counts = country ? country.mineral_count : 0
                    const nesting = feature.geometry.type === 'Polygon' ? 1 : 2
                    // eslint-disable-next-line no-undef
                    const coords = L.GeoJSON.coordsToLatLngs(
                        feature.geometry.coordinates,
                        nesting
                    )

                    // console.log(feature)
                    outputInner.latlngs = coords
                    outputInner.id = feature.properties.iso_a3
                    outputInner.color = this.colorScale(counts)
                    outputInner.colorId = this.colors.find(
                        (d) => d.color === outputInner.color
                    ).id
                    outputInner.type = feature.geometry.type
                    outputInner.count = counts
                    outputInner.country = feature.properties.name_long
                    const highlight = this.highlightCountry.find(
                        (d) => d === feature.properties.iso_a3
                    )
                    outputInner.highlight = !!highlight

                    if (highlight) {
                        console.log(coords)
                        const coordsLocal =
                            coords.length > 1
                                ? coords.sort(
                                      (a, b) => b[0].length - a[0].length
                                  )[0] // get biggest polygon
                                : coords
                        this.markersStatic.push({
                            // eslint-disable-next-line no-undef
                            coordinates: L.latLngBounds(
                                coordsLocal
                            ).getCenter(),
                            country: feature.properties.name_long,
                            count: counts,
                        })
                        this.markersExtent = this.markersExtent.concat(
                            ...coordsLocal
                        )
                    }

                    output.push(outputInner)
                })
            return output
        },
        tooltipOptions() {
            return {
                sticky: true,
                interactive: true,
            }
        },
    },
    watch: {},
    mounted() {
        // eslint-disable-next-line no-undef
        console.log(L)
    },
    async created() {
        this.mapJson = await getGeoJson().then((d) => d.features)
        console.log(this.mapJson)
    },
    methods: {
        onResize() {
            console.log('resize')
            this.$refs.map.mapObject._onResize()
        },
        fitBounds() {
            if (this.markersExtent.length > 0) {
                this.$nextTick(() => {
                    const bounds = this.markersExtent.map((d) => [d.lat, d.lng])
                    this.$refs.map.mapObject.fitBounds(bounds)
                })
            }
        },
        polygonsReady() {
            // this.$refs.polygons.mapObject.eachLayer((layer) => {
            //   layer.on('mouseover', (d) => {
            //     console.log(d)
            //     console.log(layer)
            //     this.hoveredLayer = true
            //     this.hoveredLayerdata.country = layer.country
            //     this.hoveredLayerdata.count = layer.count
            //   })
            // })
        },
        mouseoverPolygon(layer, event) {
            event.target.setStyle({ weight: 3, color: 'black', opacity: 0.5 })
            this.hoveredLayer = true
            this.hoveredLayerData.country = layer.country
            this.hoveredLayerData.count = layer.count
        },
        mouseoutPolygon(layer, event) {
            event.target.setStyle({
                weight: 1,
                color: layer.color,
                opacity: layer.highlight ? 0.5 : 0.2,
            })
            this.hoveredLayer = false
        },
        updateVisible() {
            console.log('apojgadpda')
        },
    },
}
</script>
<style scoped>
@import 'leaflet/dist/leaflet.css';
</style>
