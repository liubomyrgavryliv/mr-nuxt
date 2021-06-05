<template>
    <div>
        <v-container fluid class="ma-0 pa-0">
            <LazyMineralTopCard></LazyMineralTopCard>
            <v-tabs
                v-model="tab"
                background-color="white"
                class="mx-auto pa-0"
                show-arrows
                center-active
            >
                <v-tab
                    v-for="item in mineral.tabs"
                    :key="`tab_${item.tab_id}`"
                    class="ma-0 px-1 font-weight-medium text-caption text-sm-body-2 text-md-body-2 text-lg-body-1"
                    active-class="tab-active"
                    :to="`${item.tab_short_name}`"
                    replace
                    nuxt
                >
                    {{ item.tab_long_name }}
                </v-tab>
            </v-tabs>
        </v-container>
        <v-container class="mx-auto">
            <v-slide-x-transition>
                <nuxt-child keep-alive />
            </v-slide-x-transition>
        </v-container>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'MineralId',
    middleware({ route, redirect }) {
        if (route.fullPath === `/mineral/${route.params.mineral_id}`) {
            return redirect(`/mineral/${route.params.mineral_id}/history`)
        }
    },
    props: {},
    async asyncData({ params, store, error }) {
        try {
            await store.dispatch(
                'mineral/fetchMineralDetail',
                params.mineral_id
            )
        } catch (e) {
            return error({ message: e.message, statusCode: e.response })
        }
    },
    data() {
        return {
            tab: null,
        }
    },
    computed: {
        ...mapGetters({
            mineral: 'mineral/getMineralDetail',
        }),
    },
    created() {},
    methods: {},
}
</script>
<style scoped>
/* .tab-active {
    background-color: var(--v-info-base);
    border-color: var(--v-primary-base);
    border-width: 2px;
    border-top-style: solid;
    border-right-style: solid;
    border-left-style: solid;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
} */

.v-tab {
    text-transform: capitalize;
}
::v-deep .v-tabs {
    position: sticky;
    top: 3em;
    z-index: 3;
}
/* .v-tab:not(.tab-active) {
    border-bottom-style: solid;
    border-color: var(--v-primary-base);
    border-width: 2px;
}

::v-deep .v-slide-group__prev,
::v-deep .v-slide-group__next {
    border-bottom-style: solid;
    border-color: var(--v-primary-base);
    border-width: 2px;
} */
</style>
