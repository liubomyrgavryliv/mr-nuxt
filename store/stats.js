export const state = () => ({
    discovery_country_counts: null,
})

export const actions = {
    async fetchDiscoveryCountryCounts({ commit }) {
        try {
            const discoveryCountryCounts = await this.$axios.$get(
                '/api/stats/discovery_country_counts'
            )
            console.log(discoveryCountryCounts)
            commit('setDiscoveryCountryCounts', discoveryCountryCounts)
        } catch (err) {
            throw new Error(err)
        }
    },
}

export const mutations = {
    setDiscoveryCountryCounts(state, discoveryCountryCounts) {
        state.discovery_country_counts = discoveryCountryCounts
    },
}

export const getters = {
    getDiscoveryCountryCounts(state) {
        return state.discovery_country_counts
    },
}
