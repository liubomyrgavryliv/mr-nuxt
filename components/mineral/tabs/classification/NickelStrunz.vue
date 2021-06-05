<template>
    <div>
        <LazyTextSectionTitle>
            <template v-slot:title>
                {{ classification.title }}</template
            ></LazyTextSectionTitle
        >
        <LazyTextSectionText v-if="classification.type == 'ns'">
            <template #text>
                <div
                    v-if="classification.data.ns_class"
                    class="font-weight-bold"
                >
                    {{ classification.data.ns_class.index }}
                    <span class="font-weight-regular">
                        - {{ classification.data.ns_class.description }}</span
                    >
                </div>
                <div
                    v-if="classification.data.ns_subclass"
                    class="font-weight-bold"
                >
                    {{ classification.data.ns_subclass.index }}
                    <span class="font-weight-regular">
                        -
                        {{ classification.data.ns_subclass.description }}</span
                    >
                </div>
                <div
                    v-if="classification.data.ns_family"
                    class="font-weight-bold"
                >
                    {{ classification.data.ns_family.index }}
                    <span class="font-weight-regular">
                        - {{ classification.data.ns_family.description }}</span
                    >
                </div>
            </template>
        </LazyTextSectionText>
    </div>
</template>
<script>
export default {
    name: 'NickelStrunz',
    props: {},
    data() {
        return {}
    },
    computed: {
        classification: {
            get() {
                return this.$store.getters[
                    'mineral/getMineralClassificationByType'
                ]('ns')
            },
        },
    },
    watch: {},
    mounted() {},
    methods: {},
}
</script>
<style scoped></style>
