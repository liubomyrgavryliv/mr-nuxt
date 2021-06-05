<template>
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 500 20`">
        <g class="mapLegend" transform="translate(10,10)">
            <g
                v-for="(item, index) in legendItems"
                :key="item.id"
                class="legend"
            >
                <rect
                    :width="width"
                    :height="height"
                    :transform="`translate(${width + index * width},0)`"
                    :fill="item.color"
                    class="legend-rect"
                />
                <line
                    class="tick"
                    :transform="`translate(${width + index * width},0)`"
                    :x1="0"
                    :x2="0"
                    :y1="0"
                    :y2="-2"
                ></line>
                <!-- <text dy="1em" :transform="`translate(${width + index * width},0)`">
          {{ item.legend }}
        </text> -->
            </g>
        </g>
    </svg>
</template>
<script>
export default {
    name: 'LegendBar',
    props: {
        colorScale: {
            type: Function,
            required: true,
        },
        legendItems: {
            type: Array,
            required: true,
        },
        width: {
            type: Number,
            default: 20,
        },
        height: {
            type: Number,
            default: 10,
        },
    },
    mounted() {
        console.log(this.colorScale)
        console.log(this.legendItems)
    },
}
</script>
<style scoped>
.legend-rect {
    stroke-width: 0.2px;
    stroke: black;
}
.tick {
    stroke-width: 0.2px;
    stroke: black;
}
</style>
