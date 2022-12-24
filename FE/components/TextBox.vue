<template>
    <section class="h-[60px] shadow bg-white flex items-center justify-between m-2 py-2 px-[16px]">
        <input class="btn border border-slate-50 grow rounded-0 h-full text-left" v-model="message" />
        <button 
        class="btn bg-orange-100 text-orange-600 rounded-0 font-medium py-[8px] px-5"
        @click="sendMessage"
        >
        Send <i class="pi pi-send font-medium"></i>
        </button>
    </section>
</template>

<script>
export default {
    name: 'TextBox',
    data() {
        return {
            message: ''
        }
    },
    methods: {
        async sendMessage() {
            if(!this.message) return;
            try {
                const data = {
                    recipient: this.$route.query.id,
                    sender: this.$auth.user._id,
                    message: this.message,
                }

                const {chat} = await this.$axios.$post('/chats/send', {...data});
                console.log(chat)
                this.message = ''
                this.$store.dispatch('chats/newMessage', {recipient: this.$route.query.id, data: chat})
                this.$emit('sent')
            }catch(err) {
                console.log(err)
            }
        },
    }
}
</script>