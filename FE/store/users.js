export const state = () => ({
    data: [],
})

export const actions = {
    async getUsers({commit}) {
        try{
            const resp = await this.$axios.$get('/')
            commit('SET_DATA', resp)
        }catch(err) {
            console.log(err)
        }
    }
}

export const mutations = {
    SET_DATA(state, data) {
        state.data = data;
    }
}