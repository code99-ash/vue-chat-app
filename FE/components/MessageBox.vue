<template>
    <section class="message-container">
        <header class="flex items-center space-x-3 border-b border-[#fff] p-[15px] h-[60px]">
          <button class="btn bg-neutral-100 w-[30px] h-[30px] rounded-full centerXY">
            <i class="pi pi-user text-sm font-medium text-slate-300"></i>
          </button>
          <h1 class="text-base md:text-lg font-medium text-slate-400">{{user.user}}</h1>
        </header>
        <!-- Chats Card -->
        <section class="grow overflow-x-hidden overflow-y-scroll messages" ref="messages" id="messages">
          <div class="flex pt-[50px] justify-center" v-if="loading">
            <i class="pi pi-spin pi-spinner text-5xl font-bold text-orange-400"></i>
          </div>
          <section v-else-if="!loading &&  $store.state.chats.data[`chat-${$route.query.id}`]">
            <message-text :data="$store.state.chats.data[`chat-${$route.query.id}`]"></message-text>
            <message-text :data="messages"></message-text>
          </section>
        </section>
    </section>
</template>

<script>
import MessageText from './MessageText.vue'
export default {
    name: 'MessageBox',
    components: { MessageText },
    props: {
        loading: {
            type: Boolean,
            default: true
        },
        added: {
            type: Boolean,
            default: false
        },
        user: {
            type: Object | undefined
        },
    },
    mounted() {
        this.scrollToBottom()
        this.socket = this.$nuxtSocket({
          name: 'home',
          channel: '/',
          reconnection: false,
        })
        this.socket.on('newMessage', (chat) => {
          if(chat.recipient == this.$auth.user._id) { // a message for us
              // Check if sender is the current chat
              if(chat.sender == this.$route.query.id) {
                // Push to current Message
                this.messages.push(chat)
              }

              // save to store;
              this.$store.dispatch('chats/newMessage', {recipient: chat.sender, data: chat})
          }
          console.log(this.$store.state.chats.data)
        })
    },
    data() {
      return {
        messages: []
      }
    },
    watch: {
      added: function(val) {
        if(val) {
          this.scrollToBottom()
          this.messages.push(this.storageData()[this.storageData().length - 1])
          // console.log(this.messages)
        }
      }
    },
    methods: {
      scrollToBottom() {
        this.$refs.messages.scrollTo(0, this.$refs.messages.scrollHeight);
      },
      storageData() {
        return this.$store.state.chats.data[`chat-${this.$route.query.id}`]
      }
    }
}
</script>

<style scoped>
    .message-container {
        height: calc(100vh - 60px);
    }
    .messages {
        height: calc(100% - 60px);
    }
    .messages::-webkit-scrollbar {
        width: 8px;
    }
    .messages::-webkit-scrollbar-thumb {
        @apply bg-orange-300;
    }
</style>