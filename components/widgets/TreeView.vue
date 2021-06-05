<template>
    <v-treeview
        :items="items"
        :item-children="itemChildrenKey"
        :item-key="itemKey"
        :item-text="itemText"
        :load-children="loadFunction"
        :active.sync="active"
        :open.sync="nodesOpen"
        expand-icon="mdi-chevron-down"
        multiple-active
        transition
        dense
        class="mx-2 my-1"
    >
        <template v-slot:label="{ item }"
            ><slot :item="item" name="label"></slot
        ></template>
    </v-treeview>
</template>
<script>
export default {
    name: 'TreeView',
    props: {
        items: {
            type: Array,
            required: true,
        },
        itemChildrenKey: {
            type: String,
            required: true,
        },
        itemKey: {
            type: String,
            required: true,
        },
        itemText: {
            type: String,
            required: true,
        },
        loadFunction: {
            type: Function,
            required: true,
        },
        nodes: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            active: [],
        }
    },
    computed: {
        nodesOpen: {
            get() {
                return this.nodes
            },
            set(node) {
                this.$emit('change', node)
            },
        },
    },
}
</script>
<style scoped></style>
