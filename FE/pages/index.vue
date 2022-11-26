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
            <div 
              class="flex space-x-2 py-2 border-neutral-50" 
              v-for="(user, idx) in $store.state.users.data" 
              :class="[idx==0? '':'border-t']"
              :key="user._id"
            >
              <div class="flex-none w-[40px] h-[40px] rounded-full bg-sky-50"></div>
              <div class="grow space-y-1">
                <h4 class="text-neutral-500 text-sm font-medium">{{user.username}}</h4>
                <p class="text-xs text-slate-400">{{user.email}}</p>
              </div>
            </div>
        </div>
      </section>
    </nav>

    <!-- MAIN COMPONENTS -->
    <main class="grow flex flex-col h-[100vh] space-y-2 relative">
      <template v-if="$auth.loggedIn">
        <header class="flex items-center space-x-3 border-b border-[#fff] p-[15px] h-max">
          <button class="btn bg-neutral-100 w-[30px] h-[30px] rounded-full centerXY">
            <i class="pi pi-user text-sm font-medium text-slate-300"></i>
          </button>
          <h1 class="text-base md:text-lg font-medium text-slate-400">John Doe</h1>
        </header>
        <!-- Chats Card -->
        <section class="grow overflow-x-hidden overflow-y-scroll ">
          <section class="flex flex-col space-y-2 p-2">
            <div class="tw-card max-w-[80%] self-start">
              <p class="text-neutral-500 text-sm">Hey there!!</p>
              <span class="text-xs text-neutral-400 float-right">08:20</span>
            </div>
            <div class="tw-card max-w-[80%] self-end">
              <p class="text-neutral-500 text-sm">Hey, Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos mollitia aut voluptas enim molestias sunt? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ullam fugiat, aliquid tenetur aut illo. Vero illum consequatur quae deleniti.</p>
              <span class="text-xs text-neutral-400 float-right">08:20</span>
            </div>
          </section>
        </section>
  
        <!-- Input Bar -->
        <section class="min-h-[42px] shadow max-h-[100px] bg-white flex items-center justify-between m-2 py-2 px-[16px]">
          <input class="btn border border-slate-50 grow rounded-0" />
          <button class="btn bg-orange-100 text-orange-600 rounded-0 font-medium">
            Send <i class="pi pi-send font-medium"></i>
          </button>
        </section>
      </template>
      
      <section v-else class="min-w-[400px] mx-auto pt-[100px]">
        <Login />
      </section>
    </main>

    <!-- RIGHT NAV -->
    <nav class="flex-none w-[220px] bg-white h-full">
      <header class="flex items-center space-x-3 border-b border-neutral-50 p-[15px]">
        <i class="pi pi-info-circle font-bold text-slate-300"></i>
        <h1 class="text-base md:text-lg font-medium text-slate-400">Info</h1>
      </header>

      <!-- User Profile -->
      <div class="flex items-center justify-center flex-col p-[10px]">
        <!-- Image -->
        <div class="w-[100px] h-[100px] rounded-full bg-neutral-50"></div>
        <h3 class="text-slate-500 text-base md:text-lg font-medium">John Doe</h3>
      </div>
    </nav>
  </section>
</template>

<script>
import Login from '@/components/Auth/Login'
export default {
  components: {
    Login
  }
}
</script>