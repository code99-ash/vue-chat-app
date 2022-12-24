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

      <user-lists></user-lists>
    </nav>

    <!-- MAIN COMPONENTS -->
    <main class="grow flex flex-col min-h-[100vh] max-h-[100vh] space-y-2 relative overflow-hidden">
      <template v-if="$auth.loggedIn && $route.query.user">
        <message-box :loading="loading" :user="user" :added="added" class="message-box"></message-box>
  
        <!-- Input Bar -->
        <text-box @sent="messageSent"></text-box>
      </template>
      <Cover v-else-if="$auth.loggedIn && !$route.query.user" />
      
      <section v-else class="min-w-[400px] mx-auto pt-[100px]">
        <Login v-if="authType == 'login'" @setAuthType="setAuthType" />
        <Signup v-else @setAuthType="setAuthType" />
      </section>
    </main>
  </section>
</template>

<script>
import Login from '@/components/Auth/Login'
import Signup from '@/components/Auth/Signup'
import Cover from '@/components/Cover'
import UserLists from '../components/UserLists.vue'
import MessageBox from '../components/MessageBox.vue'
import TextBox from '../components/TextBox.vue'
export default {
  components: {
    Login, 
    Cover, 
    Signup,
    UserLists,
    MessageBox,
    TextBox,
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
      loading: true,
      added: false,
    }
  },
  methods: {
    setAuthType(type) {
      this.authType = type
    },
    messageSent() {
      this.added = true
      setTimeout(() => {
        this.added = false
      }, 200);
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
  }
}
</script>

<style scoped>

</style>