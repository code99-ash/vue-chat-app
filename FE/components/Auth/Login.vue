<template>
    <section class="w-full h-auto space-y-2">
        <h1 class="text-sky-600 font-medium text-2xl md:text-3xl">Login</h1>

        <div 
            :class="[feedback.severity=='error'? 'bg-red-200 text-red-500':'text-blue-200 text-blue-400']"
            class="rounded px-[20px] py-[8px] text-xs mb-2 font-medium" 
            v-if="feedback.severity"
        >
        {{feedback.msg}}
        <i 
            class="pi pi-times float-right ml-3" @click="feedback.severity=undefined"
        ></i>
        </div>
        <div class="space-y-1">
            <label for="name" class="text-xs text-slate-300">Username / Email</label>
            <input 
                id="name" 
                class="input-text" 
                v-model="username"
            />
        </div>
        <div class="space-y-1">
            <label for="pass" class="text-xs text-slate-300">Password</label>
            <input 
                id="pass" 
                type="password"
                class="input-text" 
                v-model="password"
            />
        </div>
        <button 
            class="outline-0 bg-transparent my-2 text-xs text-cyan-400"
            @click="$emit('setAuthType', 'signup')"
        >Don't have an account?</button>
        <button class="w-full py-[4px] rounded bg-sky-500 text-sky-50" @click="loginUser">
            Login <i class="pi pi-spin pi-spinner text-xs ml-2" v-if="loading"></i>
        </button>
    </section>
</template>

<script>
import AlertMessage from '@/mixins/alert-message'
export default {
    mixins: [AlertMessage],
    data() {
        return {
            loading: false,
            username: '',
            password: '',
            feedback: {severity: undefined, msg: ''}
        }
    },
    methods: {
        reset() {
            this.username = '';
            this.password = '';
            this.feedback = {severity: undefined, msg: ''}
        },
        async loginUser() {
            if(!(this.username && this.password)) {
                this.feedback = {severity: 'error', msg: 'All fields are required'};
                return;
            }
            this.loading = true;
            try {
                this.feedback.severity = undefined
                
                const data = {identity: this.username, password: this.password}
                await this.$auth.loginWith('local', {data})
            }catch(err) {
                console.log(err)
                this.feedback = {severity: 'error', msg: this.handleError(err)}
                this.password = '';
            }
            this.loading = false;
        }
    }
}
</script>