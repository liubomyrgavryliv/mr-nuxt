<template>
    <v-card
        class="ma-0 pa-0 float-right"
        outlined
        raised
        :min-width="170"
        :max-width="180"
    >
        <v-card-title
            class="text-body-2 justify-center py-0 font-weight-bold text-wrap"
            >Discovery counts</v-card-title
        >
        <v-card-text class="text-caption font-weight-thin ma-0 px-1 pb-0">
            <template v-if="!hoverData.state">
                <p>Hover over a country</p>
            </template>
            <template v-else>
                <p class="font-weight-bold">{{ country }}</p>
                <p class="font-weight-medium">
                    {{ count }} mineral(s) discovered
                </p>
            </template>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: 'ControlCard',
    props: {
        hoverData: {
            type: Object,
            required: true,
        },
    },
    computed: {
        country() {
            return this.hoverData.country
        },
        count() {
            return this.hoverData.count
        },
    },
}
</script>
<style scoped>
/* .v-card {
    opacity: 0.8;
    position: absolute;
    right: 5px;
    top: 5px;
} */
</style>
