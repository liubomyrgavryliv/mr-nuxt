<template>
    <v-card-text
        class="font-weight-regular text-caption text-sm-caption text-md-body-2 text-lg-body-2"
        ><slot name="text"
    /></v-card-text>
</template>
<script>
export default {
    name: 'SectionText',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
}
</script>
<style scoped></style>
