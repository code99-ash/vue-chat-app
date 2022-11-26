<template>
    <section class="w-full sm:max-w-[400px] h-auto bg-white space-y-2">
        <h1 class="text-cyan-400 text-2xl md:text-3xl">Signup</h1>
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
            <label for="name" class="text-xs text-slate-300">Username</label>
            <input 
                id="name" 
                class="text-slate-400 text-sm w-full h-[40px] border border-slate-200 rounded px-2 outline-0" 
                v-model="username"
            />
        </div>
        <div class="space-y-1">
            <label for="email" class="text-xs text-slate-300">Email</label>
            <input 
                id="email" 
                class="text-slate-400 text-sm w-full h-[40px] border border-slate-200 rounded px-2 outline-0" 
                v-model="email"
            />
        </div>
        <div class="md:flex md:items-center md:justify-between md:space-x-2 space-y-1">
            <div class="space-y-1">
                <label for="pass" class="text-xs text-slate-300">Password</label>
                <input 
                    id="pass" 
                    type="password"
                    class="text-slate-400 bg-neutral-50 text-sm w-full h-[40px] border border-slate-200 rounded px-2 outline-0" 
                    v-model="password"
                />
            </div>
            <div class="space-y-1">
                <label for="pass2" class="text-xs text-slate-300">Password Again</label>
                <input 
                    id="pass2" 
                    type="password"
                    class="text-slate-400 bg-neutral-50 text-sm w-full h-[40px] border border-slate-200 rounded px-2 outline-0" 
                    v-model="password2"
                />
            </div>
        </div>
        <button 
            class="outline-0 bg-transparent mt-2 mb-3 text-xs text-orange-400"
            @click="$emit('setAuthType', 'login')"
        >Already have an account?</button>
        <button class="w-full py-[4px] rounded bg-sky-500 text-sky-50" @click="signupUser">
            Signup <i class="pi pi-spin pi-spinner text-xs ml-1" v-if="loading"></i>
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
            email: '',
            password: '',
            password2: '',
            feedback: {severity: undefined, msg: ''}
        }
    },
    methods: {
        hideDialog() {
            if(this.loading) return;
            this.authDialog = false;
            this.reset();
            this.$emit('resetAuthType')
        },
        reset() {
            this.username = '';
            this.email = '';
            this.password = '';
            this.password2 = '';
            this.feedback = {severity: undefined, msg: ''}
        },
        async signupUser() {
            const {email, username, password, password2} = this;
            if(!(email && username && password && password2)) {
                return this.feedback = {severity: 'error', msg:'All fields are required'};
            }
            if(password !== password2) {
                return this.feedback = {severity: 'error', msg:'Passwords do not match'};
            }
            this.loading = true;
            try {
                this.feedback.severity = undefined

                await this.$axios.$post('/auth/register', {email, username, password})
            }catch(err) {
                console.log(err)
                this.feedback = {severity: 'error', msg: this.handleError(err)}
            }
            this.loading = false;
        }
    }
}
</script>