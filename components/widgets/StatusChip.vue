<template>
    <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                class="pa-2"
                color="status_chip"
                text-color="white"
                x-small
                v-bind="attrs"
                v-on="on"
            >
                {{ joinStrings(status, 'status_id') }}
            </v-chip>
        </template>
        <span>{{ joinStrings(status, 'description_short') }}</span>
    </v-tooltip>
</template>
<script>
export default {
    name: 'StatusChip',
    props: {
        status: {
            type: Array,
            required: true,
        },
    },
}
</script>
<style scoped></style>
