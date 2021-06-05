<template>
    <v-row dense justify="space-around" align="start" class="mt-2">
        <v-col
            v-for="col in svg_items"
            :key="col.id"
            cols="12"
            sm="4"
            md="4"
            lg="4"
        >
            <v-card flat color="transparent">
                <v-img
                    class="mx-auto"
                    max-height="150"
                    contain
                    :src="require(`~/assets/svg/${col.filename}`)"
                ></v-img>
                <LazyTextSectionTitle
                    class="text-h6 card_background rounded-sm ma-2 pa-1 font-weight-bold"
                    ><template v-slot:title>{{
                        col.title
                    }}</template></LazyTextSectionTitle
                >
                <LazyTextSectionText
                    ><template v-slot:text>{{
                        col.text
                    }}</template></LazyTextSectionText
                >
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
/* eslint-disable no-multi-str */
export default {
    name: 'DescriptionGrid',
    props: {},
    data() {
        return {
            svg_items: [
                {
                    id: 0,
                    filename: 'under_construction-01.svg',
                    title: 'Build',
                    text:
                        'We are constantly updating and improving our website as well as back-end to make it work faster and deliver \
                         the data to you more convenient. We have chosen Nuxt.js as our front-end framework for 3 reasons: its lightnining fast, \
                         well documented and allows SSR as well as SSG!',
                },
                {
                    id: 1,
                    filename: 'under_construction-02.svg',
                    title: 'Database',
                    text:
                        'We are updating our PostgreSQL database, running on RDS, almost every day. The other principal process includes adding and updating the models in Django, as \
             we have chosen this fantastic framework to accomodate, scale and transfer the data from the database.',
                },
                {
                    id: 2,
                    filename: 'under_construction-03.svg',
                    title: 'REST API',
                    text:
                        'Our main focus is the Users Experience. We love working with our data and continuously improve the REST API so you love it too!\
             We are using Django REST framework as a gateway to our database. Curently, we are documenting our API using swagger.io. \
             Once ready, we will publish a detailed documentation on at least a part of our API. Stay tuned!',
                },
            ],
        }
    },
}
</script>
<style scoped></style>
