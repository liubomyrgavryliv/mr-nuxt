<template>
    <v-card flat tile>
        <v-card-title
            class="text-subtitle-2 text-sm-subtitle-1 text-md-subtitle-1 text-lg-h6"
            v-html="mineralInfo"
        >
        </v-card-title>
        <v-divider class="mx-auto ml-2 mr-2"></v-divider>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'TopCard',
    props: {},
    data() {
        return {}
    },
    computed: {
        mineralInfo() {
            let banner = [
                this.mineral.mineral_name,
                this.mineral.formula,
                this.mineral.ns_index,
            ]
            banner = banner.filter((d) => d !== null)
            return banner.join(' / ')
        },
        ...mapGetters({
            mineral: 'mineral/getMineralDetail',
        }),
    },
}
</script>
<style scoped></style>
