export const state = () => ({
    data: [],
})

export const actions = {
    newMessage({commit}, data) {
        commit('NEW_MESSAGE', data)
    }
}

export const mutations = {
    NEW_MESSAGE(state, data) {
        state.data.push(data)
    }
}