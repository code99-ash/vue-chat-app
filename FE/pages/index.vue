<template>
  <section class="flex bg-sky-50 h-[100vh]">
    <!-- LEFT NAV -->
    <nav class="flex-none w-[220px] bg-white h-full">
      <header class="flex items-center space-x-3 border-b border-neutral-50 p-[15px]">
        <button class="btn bg-neutral-50 rounded px-[10px] py-[4px] centerXY">
          <i class="pi pi-chevron-left text-sm font-medium text-slate-300"></i>
        </button>
        <h1 class="text-base md:text-lg font-medium text-slate-400">Chat</h1>
      </header>

      <section>
        <div class="space-y-1 px-2">
            <nuxt-link 
              class="flex space-x-2 py-2 border-neutral-50" 
              v-for="(user, idx) in $store.state.users.data" 
              :class="[idx==0? '':'border-t']"
              :key="user._id"
              :to="`/?user=${user.username}&id=${user._id}`"
            >
              <div class="flex-none w-[40px] h-[40px] rounded-full bg-sky-50"></div>
              <div class="grow space-y-1">
                <h4 class="text-neutral-500 text-sm font-medium">
                  {{$auth.user && $auth.user._id == user._id? 'Me' : user.username}}
                </h4>
                <p class="text-xs text-slate-400">{{user.email}}</p>
              </div>
            </nuxt-link>
        </div>
      </section>
    </nav>

    <!-- MAIN COMPONENTS -->
    <main class="grow flex flex-col h-[100vh] space-y-2 relative">
      <template v-if="$auth.loggedIn && $route.query.user">
        <header class="flex items-center space-x-3 border-b border-[#fff] p-[15px] h-max">
          <button class="btn bg-neutral-100 w-[30px] h-[30px] rounded-full centerXY">
            <i class="pi pi-user text-sm font-medium text-slate-300"></i>
          </button>
          <h1 class="text-base md:text-lg font-medium text-slate-400">{{user.user}}</h1>
        </header>
        <!-- Chats Card -->
        <section class="grow overflow-x-hidden overflow-y-scroll messages">
          <div class="flex pt-[50px] justify-center" v-if="loading">
            <i class="pi pi-spin pi-spinner text-5xl font-bold text-orange-400"></i>
          </div>
          <section class="flex flex-col space-y-2 p-2" v-else>
            <div 
              class="tw-card max-w-[80%]"
              :class="[msg.sender!==$auth.user._id?'self-start':'self-end']"
              v-for="msg in $store.state.chats.data[$route.query.id]" :key="msg._id"
            >
              <p class="text-neutral-500 text-sm">{{msg.message}}</p>
              <span class="text-xs text-neutral-400 float-right">08:20</span>
            </div>
          </section>
        </section>
  
        <!-- Input Bar -->
        <section class="min-h-[42px] shadow max-h-[100px] bg-white flex items-center justify-between m-2 py-2 px-[16px]">
          <input class="btn border border-slate-50 grow rounded-0 h-full text-left" v-model="message" />
          <button 
            class="btn bg-orange-100 text-orange-600 rounded-0 font-medium py-[8px] px-5"
            @click="sendMessage"
          >
            Send <i class="pi pi-send font-medium"></i>
          </button>
        </section>
      </template>
      <Cover v-else-if="$auth.loggedIn && !$route.query.user" />
      
      <section v-else class="min-w-[400px] mx-auto pt-[100px]">
        <Login v-if="authType == 'login'" @setAuthType="setAuthType" />
        <Signup v-else @setAuthType="setAuthType" />
      </section>
    </main>

    <!-- RIGHT NAV -->
    <!-- <nav class="flex-none w-[220px] bg-white h-full">
      <header class="flex items-center space-x-3 border-b border-neutral-50 p-[15px]">
        <i class="pi pi-info-circle font-bold text-slate-300"></i>
        <h1 class="text-base md:text-lg font-medium text-slate-400">Info</h1>
      </header>

      <div class="flex items-center justify-center flex-col p-[10px]">
        <div class="w-[100px] h-[100px] rounded-full bg-neutral-50"></div>
        <h3 class="text-slate-500 text-base md:text-lg font-medium">John Doe</h3>
      </div>
    </nav> -->
  </section>
</template>

<script>
import Login from '@/components/Auth/Login'
import Signup from '@/components/Auth/Signup'
import Cover from '@/components/Cover'
export default {
  components: {
    Login, Cover, Signup
  },
  watch: {
    '$route': async function(newV) {
      this.user = newV.query
      if(!this.user.id) return
      this.getUserMessages(newV.query.id)
    }
  },

  mounted() {
    if(this.$route.query.user) {
      this.getUserMessages(this.$route.query.id)
    }
  },

  data() {
    return {
      user: this.$route.query,
      authType: 'login',
      message: '',
      loading: true,
    }
  },
  methods: {
    setAuthType(type) {
      this.authType = type
    },
    getUserMessages(userId) {
      const messages = this.$store.state.chats.data[userId]
      if(!messages) {
        this.fetchUserMessage()
      }
    },
    // this fetch user messages with authorized user
    async fetchUserMessage() { 
        this.loading = true
        try {
            const data = await this.$axios.$post('/chats', {
              recipient: this.user.id, 
              sender: this.$auth.user._id
            })
            await this.$store.dispatch('chats/newMessage', {recipient: this.user.id, data});
        }catch(err) {
          console.error(err)
        }
        this.loading = false
    },
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
      }catch(err) {
        console.log(err)
      }
    },
  }
}
</script>

<style scoped>
.messages::-webkit-scrollbar {
    width: 8px;
}
.messages::-webkit-scrollbar-thumb {
  @apply bg-orange-300;
}
</style>