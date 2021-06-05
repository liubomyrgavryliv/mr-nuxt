<template>
    <v-card class="ma-0 pa-0" outlined raised :min-width="70" :max-width="100">
        <svg :width="80" :height="125">
            <g transform="translate(5,5)">
                <template v-for="(color, i) in colorScale">
                    <g
                        :key="color.count"
                        :width="15"
                        :height="15"
                        :transform="`translate(0, ${i * 15})`"
                    >
                        <rect
                            :x="0"
                            :y="0"
                            :width="15"
                            :height="15"
                            :fill="color.color"
                            :style="{ opacity: 0.7 }"
                            @mouseover="mouseoverLegend(color.id, $event)"
                            @mouseout="mouseoutLegend($event)"
                        ></rect>
                        <text
                            dy="1em"
                            transform="translate(20,0)"
                            class="font-weight-regular"
                        >
                            {{ color.legend }}
                        </text>
                    </g>
                </template>
            </g>
        </svg>
    </v-card>
</template>
<script>
export default {
    name: 'ControlLegend',
    props: {
        colors: {
            type: Array,
            required: true,
        },
    },
    computed: {
        colorScale() {
            return this.colors
        },
    },
    methods: {
        mouseoverLegend(colorId, event) {
            console.log(colorId)
            console.log(event)
            event.target.style.opacity = 1
        },
        mouseoutLegend(event) {
            event.target.style.opacity = 0.7
        },
    },
}
</script>
<style scoped></style>
