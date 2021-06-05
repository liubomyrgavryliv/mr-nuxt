<template>
    <v-container fluid>
        <v-row dense no-gutters justify="center">
            <v-col class="ma-0 pa-0">
                <v-card
                    outlined
                    raised
                    class="fill-height overflow-y-auto"
                    max-height="60vh"
                >
                    <v-card-title>Contact us</v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle
                        >Got an idea or a general feedback? Share it
                        here!</v-card-subtitle
                    >
                    <v-card-text>
                        <v-row dense no-gutters align="start">
                            <v-col cols="12" sm="6" md="6" lg="6">
                                <v-textarea
                                    clearable
                                    clear-icon="mdi-close-circle"
                                    placeholder="Please, share your thoughts with us..."
                                    filled
                                    auto-grow
                                    outlined
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" lg="6">
                                <v-card-text>
                                    Thanks for taking the time to share your
                                    thoughts - every feedback makes
                                    mineralogy.rocks a better place!
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name: 'Contact',
    props: {},
    data() {
        return {}
    },
}
</script>
