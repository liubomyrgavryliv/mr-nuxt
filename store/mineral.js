// the module handles data fetching with lux app of gta-main-api
import { mixinMethods } from '@/plugins/vuexMixins'

export const methods = {
    ...mixinMethods(),
}

export const state = () => ({
    mineral_detail: null,
    mineral_classification: [],
    mineral_history: null,
    group_first_children: [],
})

export const actions = {
    async fetchMineralDetail({ commit }, mineralId) {
        try {
            const mineral = await this.$axios.$get(`/api/mineral/${mineralId}`)
            console.log(mineral)
            commit('setMineralDetail', mineral)
        } catch (err) {
            throw new Error(err)
        }
    },
    async fetchMineralHistory({ commit, state }, mineralId) {
        try {
            const mineralHistory = await this.$axios.$get(
                `/api/mineral/history/${mineralId}`
            )
            console.log(mineralHistory)
            commit('setMineralHistory', mineralHistory)
        } catch (err) {
            throw new Error(err)
        }
    },
    async fetchMineralClassification({ commit, state }, mineralId) {
        try {
            const mineralClassification = await this.$axios.$get(
                `/api/mineral/classification/${mineralId}`
            )
            console.log(mineralClassification)
            commit('setMineralClassification', mineralClassification)

            const groups = mineralClassification.find(
                (d) => d.type === 'groups'
            )
            if (groups) {
                if (
                    (state.group_first_children.length > 0 &&
                        groups.data[0].id !==
                            state.group_first_children[0].id) ||
                    state.group_first_children.length === 0
                )
                    // do not reset state.group_first_children if it is already uploaded!
                    commit('setGroupFirstChildren', {
                        children: groups.data,
                        append: false,
                    })
            } else {
                commit('setGroupFirstChildren', {
                    children: [],
                    append: false,
                })
            }
        } catch (err) {
            throw new Error(err)
        }
    },
    async fetchGroupFirstChildren({ commit }, payload) {
        try {
            const children = await this.$axios.$get(
                `api/group_first_children/${payload.mineral_id}`
            )
            console.log(children)
            commit('setGroupFirstChildrenById', {
                id: payload.id,
                children,
            })
        } catch (err) {
            throw new Error(err)
        }
    },
}

export const mutations = {
    setMineralDetail(state, mineral) {
        state.mineral_detail = mineral
    },
    setMineralClassification(state, mineralClassification) {
        state.mineral_classification = mineralClassification
    },
    setMineralHistory(state, mineralHistory) {
        state.mineral_history = mineralHistory
    },
    setGroupFirstChildren(state, payload) {
        console.log(payload)
        const children = payload.children
        const append = payload.append
        if (append) state.group_first_children.push(...children)
        else state.group_first_children = children
    },
    setGroupFirstChildrenById(state, { id, children }) {
        methods
            .findChild(state.group_first_children, id)
            .children.push(...children)
    },
}

export const getters = {
    getMineralDetail: (state) => {
        return state.mineral_detail
    },
    getMineralHistory: (state) => {
        return state.mineral_detail.history
    },
    getMineralDetailRelations: (state) => {
        return state.mineral_detail.relations
    },
    getMineralClassification: (state) => {
        return state.mineral_classification
    },
    getMineralClassificationByType: (state) => (type) => {
        return state.mineral_classification.find((d) => d.type === type)
    },
    getGroupFirstChildren: (state) => {
        return state.group_first_children
    },
}
