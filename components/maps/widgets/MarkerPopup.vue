<template>
    <div>
        <v-card-title>{{ country }}</v-card-title>
        <v-card-text>{{ count }} minerals discovered</v-card-text>
    </div>
</template>
<script>
export default {
    name: 'MarkerPopup',
    props: {
        mineralId: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {}
    },
}
</script>
<style scoped></style>
