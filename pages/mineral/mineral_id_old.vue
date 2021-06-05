<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="12" md="12" lg="10">
                <v-card outlined raised color="secondary">
                    <v-row no-gutters justify="end" class="pt-1 pr-1">
                        <LazyWidgetsChipTooltip
                            v-if="mineral.ns_index"
                            :label="mineral.ns_index"
                            :tooltip="nsTooltip"
                        ></LazyWidgetsChipTooltip>
                    </v-row>
                    <v-row no-gutters justify="center">
                        <div class="text-center mb-0">
                            <v-card-title
                                class="text-h4 text-sm-h4 text-md-h3 ma-0 pa-0 pb-1 justify-center"
                            >
                                {{ mineral.mineral_name }}
                            </v-card-title>
                        </div>
                    </v-row>
                    <v-card-subtitle
                        v-if="mineral.formula"
                        class="text-caption text-sm-subtitle-2 text-md-subtitle-1 mx-auto pt-0 pb-1"
                    >
                        <div class="text-center" v-html="mineral.formula"></div>
                    </v-card-subtitle>
                    <v-divider class="mx-auto ml-2 mr-2"></v-divider>
                    <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        class="mx-auto pa-0"
                        hide-slider
                        grow
                        show-arrows
                        center-active
                    >
                        <v-tab
                            v-for="item in tabItems"
                            :key="item.id"
                            class="ma-0 px-1 font-weight-medium text-caption text-sm-body-2 text-md-body-2 text-lg-body-1"
                            active-class="tab-active"
                            :to="`${item.route}`"
                            replace
                            nuxt
                        >
                            {{ item.name }}
                        </v-tab>
                        <v-tabs-items
                            v-model="tab"
                            touchless
                            continuous
                            show-arrows-on-hover
                        >
                            <v-tab-item
                                v-for="item in tabItems"
                                :id="item.route"
                                :key="item.id"
                            >
                                <nuxt-child keep-alive />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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
            tabsAvailable: [
                {
                    id: 0,
                    route: 'history', // route in Vue router
                    key: 'history', // key in api node from api/mineral/:uuid
                    name: 'history', // name of tab appear on front
                },
                {
                    id: 1,
                    route: 'relations',
                    key: 'relations',
                    name: 'people also search for',
                },
                {
                    id: 2,
                    route: 'classification',
                    key: 'classification',
                    name: 'classification taxonomy',
                },
            ],
        }
    },
    computed: {
        tabItems: {
            get() {
                const available = Object.keys(this.mineral).filter(
                    (d) =>
                        this.tabsAvailable.map((d) => d.key).includes(d) &&
                        this.mineral[d] !== null
                )
                const output = available.map((d) => {
                    const tab = this.tabsAvailable.filter(
                        (d1) => d1.key === d
                    )[0]
                    return {
                        id: tab.id,
                        name: tab.name,
                        key: tab.key,
                        route: tab.route,
                    }
                })
                const sorted = this.sortTabs(output)
                console.log(sorted)
                return sorted
            },
        },
        nsTooltip() {
            if (this.mineral.classification != null) {
                const nsNode = this.mineral.classification.filter(
                    (d) => d.type === 'ns'
                )
                if (nsNode.length > 0) {
                    const output = []
                    Object.keys(nsNode[0].data).map((d) =>
                        output.push(nsNode[0].data[d].description)
                    )
                    return output
                } else {
                    return null
                }
            } else {
                return null
            }
        },
        ...mapGetters({
            mineral: 'mineral/getMineralDetail',
        }),
    },
    created() {},
    methods: {
        sortTabs(itemsArray) {
            const that = this
            return itemsArray.slice().sort(function (a, b) {
                return (
                    that.tabsAvailable.findIndex((d) => d.name === a.name) -
                    that.tabsAvailable.findIndex((d) => d.name === b.name)
                )
            })
        },
    },
}
</script>
<style scoped>
.tab-active {
    background-color: var(--v-info-base);
    border-color: var(--v-primary-base);
    border-width: 2px;
    border-top-style: solid;
    border-right-style: solid;
    border-left-style: solid;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.v-tab {
    text-transform: capitalize;
}

.v-tab:not(.tab-active) {
    border-bottom-style: solid;
    border-color: var(--v-primary-base);
    border-width: 2px;
}

::v-deep .v-slide-group__prev,
::v-deep .v-slide-group__next {
    border-bottom-style: solid;
    border-color: var(--v-primary-base);
    border-width: 2px;
}
</style>
