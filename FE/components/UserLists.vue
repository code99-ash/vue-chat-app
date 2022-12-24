<template>
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
</template>

<script>
export default {
    name: 'UserLists'
}
</script>