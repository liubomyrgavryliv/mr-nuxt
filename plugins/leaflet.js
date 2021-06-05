import Vue from 'vue'
import L from 'leaflet'
import {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LFeatureGroup,
} from 'vue2-leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-geo-json', LGeoJson)
Vue.component('l-feature-group', LFeatureGroup)
