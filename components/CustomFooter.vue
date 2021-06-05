<template>
    <v-footer app inset absolute color="nav_background">
        <v-row dense no-gutters>
            <v-col>
                <v-card flat class="nav_background text-center">
                    <!-- <v-card-text class="nav_text--text pa-0">
                        <v-btn
                            v-for="icon in icons"
                            :key="icon.id"
                            class="mx-4 nav_text--text"
                            :href="icon.link"
                            :nuxt="icon.external"
                            :target="icon.target"
                            icon
                        >
                            <v-icon size="24px">
                                {{ icon.name }}
                            </v-icon>
                        </v-btn>
                    </v-card-text> -->
                    <v-divider class="mx-auto"></v-divider>
                    <v-card-text class="nav_text--text pa-2">
                        &copy; {{ new Date().getFullYear() }} mineralogy.rocks
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-footer>
</template>
<script>
export default {
    name: 'CustomFooter',
    data() {
        return {
            icons: [
                {
                    id: 0,
                    name: 'mdi-linkedin',
                    link:
                        'https://www.linkedin.com/in/liubomyr-gavryliv-39873b106/',
                    external: true,
                    target: '_blank',
                },
                {
                    id: 1,
                    name: 'mdi-facebook',
                    link: 'https://www.facebook.com/liubomyr.gavryliv/',
                    external: true,
                    target: '_blank',
                },
                {
                    id: 2,
                    name: 'mdi-github',
                    link: 'https://github.com/liubomyrgavryliv',
                    external: true,
                    target: '_blank',
                },
                {
                    id: 3,
                    name: 'mdi-instagram',
                    link: 'https://www.instagram.com/gpminerals_org/',
                    external: true,
                    target: '_blank',
                },
            ],
        }
    },
}
</script>
