export const state = () => ({
    data: {
        'recipient':  [
            {recipient: 388393, sender: 273838, message: 'Hey'}
        ],
        '388393': [
            {recipient: 388393, sender: 273838, message: 'Hey'}
        ]
    },
})

export const actions = {
    newMessage({commit}, data) {
        commit('NEW_MESSAGE', data)
    },
}

export const mutations = {
    SET_DATA(state, data) {
        const {sender, recipient, messages} = data
        state.data[recipient].messages = messages
    },
    NEW_MESSAGE(state, {recipient, data}) {
        if(state.data[recipient]) {
            state.data[recipient].push(data)
        }else {
            state.data[recipient] = data
        }
        console.log(state.data[recipient])
    }
}