<template>
    <v-container fluid>
        <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <h1 class="text-center ma-5">Explore minerals</h1>
                <!-- <v-text-field
            v-model="queryDebounce" 
            class='rounded-pill'
            color="black"
            background-color="info"
            hide-details
            filled
            rounded
            outlined
            clearable
            clear-icon='mdi-close-circle'
            prepend-inner-icon="mdi-magnify"
            placeholder="Start typing a mineral name..."
            @click:clear="clearSearch"
            autocomplete="off"
        >
        </v-text-field>    
            <v-card
            append
            outlined
            raised
            v-show="minerals.length > 0"
            class="fill-height overflow-y-auto" max-height="40vh"
            >
                <template v-for="(item,index) in minerals">
                        <v-hover :key="item.mineral_id" v-slot="{ hover }" >
                        <v-list-item 
                            append
                            dense 
                            selectable
                            :class="[{ 'on_hover': hover || index == currentItem }, 'pl-2 pr-2 pt-0 pb-0']"
                            :to="{ path: `mineral/${item.mineral_id}` }"
                            nuxt
                            :ref="`mineral_${index}`"
                            >
                            <v-lazy
                                :options="{
                                    threshold: .1
                                }"
                                class="fill-height"
                                :style="{ 'width': '100%'}"
                            >
                            <div class='d-flex justify-space-between'>
                                <v-list-item-content>
                                <v-list-item-title>{{ item.mineral_name }}</v-list-item-title>
                                <v-list-item-subtitle><span v-html="item.formula"></span></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-chip
                                    class="pa-2 mb-1"
                                    color='ns_chip'
                                    text-color="white"
                                    x-small
                                    v-if="item.ns_index"
                                    >
                                    {{ item.ns_index }}
                                    </v-chip>
                                    <v-chip
                                    class="pa-2"
                                    color='status_chip'
                                    text-color="white"
                                    x-small
                                    v-if="item.status.length > 0"
                                    >
                                    {{ parseStatus(item.status) }}
                                    </v-chip>
                                </v-list-item-action>
                            <div :key="item.mineral_name" class='invisible' v-if="index == minerals.length - 1" v-intersect="{
                                handler: onIntersect,
                                options: {
                                threshold: [0]
                                }
                            }"></div>
                            </div>
                            </v-lazy>
                        </v-list-item>
                        </v-hover>
                <v-divider
                    :key="index"
                ></v-divider>
                </template>
                <v-list-item class='justify-center'> 
                <v-progress-circular
                    indeterminate
                    color="background"
                    :width="2"
                    v-if="fetching"
                ></v-progress-circular>
                </v-list-item>
            </v-card> -->
                <v-autocomplete
                    v-model="model"
                    :items="minerals"
                    :search-input.sync="queryDebounce"
                    no-filter
                    attach
                    eager
                    item-text="mineral_name"
                    item-value="mineral_id"
                    clearable
                    class="rounded-pill"
                    color="black"
                    background-color="info"
                    hide-details
                    hide-no-data
                    filled
                    rounded
                    outlined
                    append-icon=""
                    clear-icon="mdi-close-circle"
                    :menu-props="{
                        closeOnClick: false,
                        closeOnContentClick: false,
                        rounded: true,
                        eager: true,
                    }"
                    prepend-inner-icon="mdi-magnify"
                    placeholder="Start typing a mineral name..."
                    @click:clear="clearSearch"
                >
                    <template v-slot:item="{ item, on, attrs }">
                        <v-list-item
                            append
                            dense
                            selectable
                            class="pl-2 pr-2 pt-0 pb-0"
                            :style="{ 'max-width': '100%' }"
                            :to="{ path: `/mineral/${item.mineral_id}` }"
                            nuxt
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-lazy
                                :options="{
                                    threshold: 0.1,
                                }"
                                class="fill-height"
                                :style="{ width: '100%' }"
                            >
                                <div>
                                    <div class="d-flex justify-space-between">
                                        <v-list-item-content>
                                            <v-list-item-title>{{
                                                item.mineral_name
                                            }}</v-list-item-title>
                                            <v-list-item-subtitle
                                                ><span
                                                    v-html="item.formula"
                                                ></span
                                            ></v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-chip
                                                v-if="item.ns_index"
                                                class="pa-2 mb-1"
                                                color="ns_chip"
                                                text-color="white"
                                                x-small
                                            >
                                                {{ item.ns_index }}
                                            </v-chip>
                                            <v-chip
                                                v-if="item.status.length > 0"
                                                class="pa-2"
                                                color="status_chip"
                                                text-color="white"
                                                x-small
                                            >
                                                {{
                                                    joinStrings(
                                                        item.status,
                                                        'status_id'
                                                    )
                                                }}
                                            </v-chip>
                                        </v-list-item-action>
                                        <div
                                            v-if="
                                                minerals.indexOf(item) ==
                                                minerals.length - 2
                                            "
                                            :key="item.mineral_name"
                                            v-intersect="{
                                                handler: onIntersect,
                                                options: {
                                                    threshold: [0],
                                                },
                                            }"
                                            class="invisible"
                                        ></div>
                                    </div>
                                    <v-divider></v-divider>
                                </div>
                            </v-lazy>
                        </v-list-item>
                    </template>
                    <template v-slot:append-item>
                        <v-list-item class="justify-center">
                            <v-progress-circular
                                v-if="fetching"
                                indeterminate
                                color="background"
                                :width="2"
                            ></v-progress-circular>
                        </v-list-item>
                    </template>
                </v-autocomplete>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'MineralSearch',
    props: {},
    data() {
        return {
            model: null,
            query: '',
            minerals: [],
            page: 1,
            showMineralCard: false,
            currentItem: 0,
            timeout: null,
            total_count: 0,
            fetching: false,
        }
    },
    computed: {
        queryDebounce: {
            get() {
                return this.query
            },
            set(val) {
                this.page = 1
                if (this.timeout) clearTimeout(this.timeout)
                this.timeout = setTimeout(() => {
                    this.query = val
                }, 300)
            },
        },
    },
    // mounted(){
    //   document.addEventListener("keydown", this.nextItem);
    // },
    // destroyed() {
    //   document.removeEventListener("keydown", this.nextItem);
    // },
    watch: {
        async query(value) {
            if (value) {
                this.minerals = await this.getMinerals()
            } else {
                this.minerals = []
            }
            this.currentItem = 0
        },
    },
    async created() {
        if (this.query.length > 0) this.minerals = await this.getMinerals()
    },
    methods: {
        getMinerals() {
            const params = {
                params: {
                    search: `mineral_name:${this.query}`,
                    page: this.page,
                },
            }
            return this.$axios
                .$get('search/mineral_list/', params)
                .then((response) => {
                    console.log(response)
                    console.log(response.results)
                    this.total_count = response.count
                    return response.results
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        clearSearch() {
            this.query = null
            this.page = 1
        },
        onIntersect(entries, observer, isIntersecting) {
            if (this.total_count / 10 > this.page) {
                console.log(this.page)
                if (this.fetching === false) {
                    this.fetching = true
                    this.page += 1
                    console.log('fetching')
                    setTimeout(async () => {
                        await this.getMinerals()
                            .then((d) => {
                                this.minerals = this.minerals.concat(d)
                                this.fetching = false
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }, 500)
                }
            }
        },
        nextItem(event) {
            // a function which decides which button was pressed and in- decrements this.currentItem
            if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
                const key = event.key
                if (key === 'ArrowDown' && this.minerals.length > 0) {
                    if (this.currentItem < this.minerals.length - 1) {
                        this.currentItem++
                        this.fixScrolling()
                    }
                } else if (key === 'ArrowUp' && this.minerals.length > 0) {
                    if (this.currentItem > 0) {
                        this.currentItem--
                        this.fixScrolling()
                    }
                }
            }
        },
        fixScrolling() {
            // a function which brings each mineral into view when navigating using buttons
            this.$refs[`mineral_${this.currentItem}`][0].$el.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'end',
            })
        },
    },
}
</script>
<style scoped>
.invisible {
    width: 0;
    height: 10;
    position: absolute;
    bottom: 0;
}

/* ::v-deep.v-autocomplete__content.v-menu__content {
  max-width: 100px !important;
} */
</style>
