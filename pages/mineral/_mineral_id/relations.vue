<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col>
                <v-card
                    outlined
                    class="fill-height overflow-y-auto"
                    max-height="60vh"
                >
                    <template v-for="(mineral, index) in mineralRelations">
                        <v-hover
                            v-slot="{ hover }"
                            :key="mineral.mineral_id"
                            :open-delay="50"
                            :close_delay="50"
                        >
                            <v-list-item
                                :key="mineral.mineral_id"
                                dense
                                nuxt
                                :to="mineral.mineral_id"
                                :class="[
                                    { on_hover: hover },
                                    'pl-2 pr-2 pt-0 pb-0',
                                ]"
                            >
                                <v-lazy
                                    :options="{
                                        threshold: 0.1,
                                    }"
                                    class="fill-height"
                                    :style="{ width: '100%' }"
                                >
                                    <div class="d-flex justify-space-between">
                                        <v-list-item-content>
                                            <v-list-item-title>{{
                                                mineral.mineral_name
                                            }}</v-list-item-title>
                                            <v-list-item-subtitle
                                                v-if="mineral.formula"
                                                ><span
                                                    v-html="mineral.formula"
                                                ></span
                                            ></v-list-item-subtitle>
                                            <v-list-item-subtitle
                                                class="caption font-italic"
                                                >{{
                                                    parseStatusDescription(
                                                        mineral.status
                                                    )
                                                }}</v-list-item-subtitle
                                            >
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-chip
                                                v-if="mineral.ns_index"
                                                class="pa-2 mb-1"
                                                color="ns_chip"
                                                text-color="white"
                                                x-small
                                            >
                                                {{ mineral.ns_index }}
                                            </v-chip>
                                        </v-list-item-action>
                                    </div>
                                </v-lazy>
                            </v-list-item>
                        </v-hover>
                        <v-divider
                            v-if="index < mineralRelations.length - 1"
                            :key="index"
                        ></v-divider>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Relations',
    props: {},
    data() {
        return {
            isActive: false,
        }
    },
    computed: {
        ...mapGetters({
            mineralRelations: 'mineral/getMineralDetailRelations',
        }),
    },
    methods: {
        parseStatusDescription(status) {
            return status.map((d) => d.description_short).join('; ')
        },
        parseStatus(status) {
            return status.map((d) => d.status_id).join('; ')
        },
    },
}
</script>
<style scoped></style>
