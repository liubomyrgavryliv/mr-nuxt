<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                class="pa-2 mb-1 float-right"
                color="ns_chip"
                text-color="white"
                small
                v-bind="attrs"
                v-on="on"
            >
                <span class="font-weight-black">{{ label }}</span>
                <v-icon right small> mdi-help-circle </v-icon>
            </v-chip>
        </template>
        <v-card dense max-width="200" class="ma-0 pa-1">
            <v-card-text class="ma-0 pa-0">
                <p class="font-italic ma-0 pa-0" v-html="tooltipJoin"></p>
            </v-card-text>
        </v-card>
    </v-tooltip>
</template>
<script>
export default {
    name: 'ChipTooltip',
    props: {
        tooltip: {
            // label, displayed on hovering
            type: [String, Array],
            required: true,
        },
        label: {
            // label, displayed in a chip
            type: String,
            required: true,
        },
    },
    data() {
        return {}
    },
    computed: {
        tooltipJoin() {
            return this.tooltip.join(
                '<span class="font-weight-black"> / </span>'
            )
        },
    },
}
</script>
<style scoped>
.v-tooltip__content {
    background-color: transparent;
    padding: 0px;
}

.v-card__text {
    font-size: 12px;
}
</style>
