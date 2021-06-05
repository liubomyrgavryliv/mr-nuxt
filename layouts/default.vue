<template>
    <v-app :style="cssProps">
        <v-navigation-drawer v-model="drawer" app temporary>
            <v-list dense nav>
                <v-list-item
                    v-for="item in single_item"
                    :key="item.key"
                    dense
                    link
                    :to="item.nuxt ? item.to : null"
                    :href="item.nuxt ? null : item.to"
                    :nuxt="item.nuxt"
                    :exact="item.exact"
                    :target="item.target"
                >
                    <v-list-item-action>
                        <template v-if="item.svg">
                            <img :src="item.svg" />
                        </template>
                        <template v-else>
                            <v-icon :small="$vuetify.breakpoint.smAndDown">{{
                                item.icon
                            }}</v-icon>
                        </template>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title
                            class="font-weight-bold text-xs-caption text-sm-caption text-md-body-2 text-lg-body-2"
                        >
                            {{ item.name }}</v-list-item-title
                        >
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            :clipped-left="clipped"
            fixed
            app
            color="nav_background"
            dense
        >
            <v-app-bar-nav-icon dense @click.stop="drawer = !drawer"
                ><template #default>
                    <v-icon color="secondary">mdi-menu</v-icon>
                </template>
            </v-app-bar-nav-icon>
        </v-app-bar>
        <v-main>
            <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
        </v-main>
        <CustomFooter></CustomFooter>
    </v-app>
</template>

<script>
import CustomFooter from '../components/CustomFooter'
export default {
    name: 'Default',
    components: {
        CustomFooter,
    },
    data() {
        return {
            clipped: true,
            drawer: false,
            fixed: false,
            single_item: [
                {
                    name: 'Homepage',
                    key: 'homepage',
                    to: '/',
                    icon: 'mdi-home',
                    target: null,
                    nuxt: true,
                    exact: false,
                },
                {
                    name: 'Django admin',
                    key: 'admin',
                    to: '/admin',
                    icon: 'mdi-cog',
                    target: '',
                    nuxt: false,
                    exact: true,
                },
                {
                    name: 'Mineral Search',
                    key: 'mineral_search',
                    to: '/mineral_search',
                    icon: 'mdi-magnify',
                    target: null,
                    nuxt: true,
                    exact: false,
                },
                {
                    name: 'Contact Us',
                    key: 'contact',
                    to: '/contact',
                    icon: 'mdi-gmail',
                    target: null,
                    nuxt: true,
                    exact: false,
                },
                {
                    name: 'About',
                    key: 'about',
                    to: '/about',
                    icon: 'mdi-information',
                    target: null,
                    nuxt: true,
                    exact: false,
                },
            ],
            items: [
                {
                    icon: 'mdi-cog',
                    title: 'Admin',
                    subtitle: 'django admin',
                    to: '/admin',
                    target: '',
                    nuxt: false,
                    exact: true,
                },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'GP<minerals/>',
        }
    },
    computed: {
        cssProps() {
            const themeColors = {}
            const theme = this.$vuetify.theme.isDark
                ? this.$vuetify.theme.themes.dark
                : this.$vuetify.theme.themes.light
            Object.keys(theme).forEach((color) => {
                themeColors[`--v-${color}`] = theme[color]
            })
            return themeColors
        },
    },
}
</script>
<style scoped lang="css">
#app {
    background: var(--v-background-base);
}

.v-btn {
    text-transform: capitalize;
}
</style>
