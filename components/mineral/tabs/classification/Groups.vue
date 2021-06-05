<template>
    <div>
        <LazyTextSectionTitle>
            <template v-slot:title
                >{{ classification.title }}></template
            ></LazyTextSectionTitle
        >
        <LazyWidgetsTreeView
            :items="groupFirstChildren"
            item-children-key="children"
            item-key="id"
            item-text="mineral_name"
            :load-function="fetchMinerals"
            :nodes="options"
            @change="options = $event"
        >
            <template #label="{ item }">
                <v-hover v-slot="{ hover }" :key="item.id" v-bind="item">
                    <div>
                        <LazyTextListItem
                            :hover="hover"
                            :text="item.mineral_name"
                            :to="{ path: `/mineral/${item.mineral_id}` }"
                        >
                            <template v-if="item.formula" #subtitle>
                                <span v-html="item.formula"></span>
                            </template>
                            <template #action>
                                <v-chip
                                    v-if="item.ns_index"
                                    class="pa-2 mb-1"
                                    color="ns_chip"
                                    text-color="white"
                                    x-small
                                >
                                    {{ item.ns_index }}
                                </v-chip>
                                <!-- <v-chip
                                    v-if="item.status && item.status.length > 0"
                                    class="pa-2"
                                    color="status_chip"
                                    text-color="white"
                                    x-small
                                >
                                    {{ joinStrings(item.status, 'status_id') }}
                                </v-chip> -->
                                <LazyWidgetsStatusChip
                                    v-if="item.status && item.status.length > 0"
                                    :status="item.status"
                                ></LazyWidgetsStatusChip>
                            </template>
                        </LazyTextListItem>
                    </div>
                </v-hover>
            </template>
        </LazyWidgetsTreeView>
    </div>
</template>
<script>
export default {
    name: 'Groups',
    props: {},
    data() {
        return {
            active: [],
            options: [],
        }
    },
    computed: {
        classification: {
            get() {
                return this.$store.getters[
                    'mineral/getMineralClassificationByType'
                ]('groups')
            },
        },
        groupFirstChildren: {
            get() {
                return this.$store.getters['mineral/getGroupFirstChildren']
            },
            set(newValue) {
                this.$store.commit(
                    'mineral/setGroupFirstChildrenById',
                    newValue
                )
            },
        },
    },
    watch: {
        classification(val) {
            console.log('CLASSIFICATION UPLOADED')
        },
    },
    mounted() {
        this.options = this.nodesChildrenRecursion(this.groupFirstChildren, [])
    },
    methods: {
        async fetchMinerals(item) {
            await this.$store.dispatch('mineral/fetchGroupFirstChildren', {
                id: item.id,
                mineral_id: item.mineral_id,
            })
        },
        nodesChildrenRecursion(minerals, output) {
            for (let i = 0; i < minerals.length; i++) {
                if (
                    'children' in minerals[i] &&
                    minerals[i].children.length > 0
                ) {
                    output.push(minerals[i].id)
                    this.nodesChildrenRecursion(minerals[i].children, output)
                }
            }
            return output
        },
    },
}
</script>
<style scoped></style>
