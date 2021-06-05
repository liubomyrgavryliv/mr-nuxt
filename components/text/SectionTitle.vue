<template>
    <v-card-title
        class="font-weight-regular text-body-2 text-sm-body-1 text-md-h6 text-lg-h6 text-decoration-underline"
        ><slot name="title"></slot
    ></v-card-title>
</template>
<script>
export default {
    name: 'SectionTitle',
    props: {},
}
</script>
<style scoped></style>
