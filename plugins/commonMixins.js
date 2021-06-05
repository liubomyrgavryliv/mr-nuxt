import Vue from 'vue'

Vue.mixin({
    methods: {
        joinStrings(arr, key) {
            return arr.map((d) => d[key]).join('; ')
        },
    },
})
