export const state = () => ({
    data: {
        'chat-recipient':  [
            {recipient: 388393, sender: 273838, message: 'Hey'}
        ],
    }
})

export const actions = {
    newMessage({commit}, data) {
        commit('NEW_MESSAGE', data)
    },
}

export const mutations = {
    SET_DATA(state, data) {
        const {sender, recipient, messages} = data
        state.data[`chat-${recipient}`].messages = messages
    },
    NEW_MESSAGE(state, {recipient, data}) {
        if(state.data[`chat-${recipient}`]) {
            state.data[`chat-${recipient}`].push(data)
        }else {
            const arr = Array.isArray(data)? data : [data];
            state.data[`chat-${recipient}`] = arr;
        }
        console.log(state.data[`chat-${recipient}`])
    }
}