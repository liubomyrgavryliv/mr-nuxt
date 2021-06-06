<template>
    <v-container>
        <v-row dense no-gutters justify="center" align="center">
            <v-col class="mx-auto" cols="12" sm="8" md="8" lg="8">
                <v-card color="transparent" flat>
                    <v-row
                        dense
                        align-content="center"
                        justify="center"
                        align="center"
                    >
                        <!-- <v-col cols="6">
                            <v-img
                                class="mx-auto"
                                max-height="150"
                                contain
                                src="~assets/svg/gp_logo-01.svg"
                            ></v-img>
                        </v-col> -->
                        <v-col cols="6">
                            <div>
                                <p
                                    class="light-text text-center font-weight-bold text-sm-h6 text-md-h4 text-break"
                                >
                                    Welcome to mineralogy.rocks!
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
                <v-divider class="ma-2 pa-2"></v-divider>
                <Carousel></Carousel>
            </v-col>
        </v-row>
        <DescriptionGrid></DescriptionGrid>
    </v-container>
</template>
<script>
import Carousel from '@/components/homepage/Carousel'
import DescriptionGrid from '@/components/homepage/DescriptionGrid'
export default {
    name: 'Index',
    components: {
        Carousel,
        DescriptionGrid,
    },
    props: {},
    data() {
        return {}
    },
}
</script>
<style scoped></style>
