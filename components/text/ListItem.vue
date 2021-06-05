<template>
    <v-list-item dense :class="{ on_hover: hover }" :nuxt="nuxt" :to="to">
        <v-list-item-content>
            <v-list-item-title
                class="font-weight-light text-wrap text-caption text-sm-caption text-md-body-2 text-lg-body-2 ma-0 px-1"
            >
                {{ text }}
            </v-list-item-title>
            <v-list-item-subtitle
                class="font-weight-thin text--secondary text-wrap text-caption ma-0 px-2"
                ><slot name="subtitle"></slot
            ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="d-none d-sm-flex">
            <slot name="action"></slot>
        </v-list-item-action>
    </v-list-item>
</template>
<script>
export default {
    name: 'ListItem',
    props: {
        text: {
            type: String,
            required: true,
        },
        to: {
            type: [String, Object],
            default: null,
        },
        nuxt: {
            type: Boolean,
            default: true,
        },
        hover: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
<style scoped></style>
