<template>
    <v-carousel
        v-model="model"
        cycle
        interval="9500"
        height="250"
        show-arrows-on-hover
        class="rounded"
    >
        <v-carousel-item v-for="item in carousel_items" :key="item.id">
            <v-sheet :color="item.color" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                    <v-col>
                        <v-card flat color="transparent">
                            <v-card-title
                                class="mb-2 black--text text-h6 text-sm-h6 text-md-h4 text-break"
                                >{{ item.title }}</v-card-title
                            >
                            <v-card-subtitle
                                class="black--text text-caption text-sm-caption text-md-body-2"
                                >{{ item.subtitle }}</v-card-subtitle
                            >
                        </v-card>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-carousel-item>
    </v-carousel>
</template>
<script>
/* eslint-disable no-multi-str */
export default {
    name: 'Carousel',
    data() {
        return {
            model: 0,
            carousel_items: [
                {
                    id: 0,
                    title: 'Research',
                    subtitle:
                        "We make research using our data. Specifically, we are intended to unravel hidden patterns within mineralogical data. \
                            We believe that programming is crucial in this era of computarization and we're using Python and R for data analysis.",
                    color: 'secondary',
                },
                {
                    id: 1,
                    title: 'Open source API',
                    subtitle:
                        'Our goal is to make mineralogical data delivery comfortable, seamless, timeless and priceless. \
                            If you are doing a research - nothing should stop you from obtaining and analysing the data!',
                    color: 'secondary',
                },
                {
                    id: 2,
                    title: 'Technologies',
                    subtitle:
                        "We're using Django and Django REST as our backend service which speaks with PostgreSQL database, hosted on AWS. \
                            The other technologies include Redis for caching, NGINX as a server gateway, and Nuxt.js as a front-end framework.",
                    color: 'secondary',
                },
            ],
        }
    },
}
</script>
<style scoped></style>
