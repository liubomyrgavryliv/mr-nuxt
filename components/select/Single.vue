<template>
    <v-select
        :value="value"
        dense
        filled
        solo
        :items="items"
        :item-text="itemTextKey"
        :item-value="itemValueKey"
        :label="label"
        :hint="hint"
        persistent-hint
        return-object
        single-line
        @input="$emit('input', $event)"
    ></v-select>
</template>
<script>
export default {
    name: 'Single',
    props: {
        value: {
            type: Object,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        itemTextKey: {
            type: String,
            required: true,
        },
        itemValueKey: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            default: '',
        },
        hint: {
            type: String,
            required: true,
        },
    },
    data() {
        return {}
    },
}
</script>
<style scoped></style>
