<template>
    <section class="flex flex-col space-y-1 p-2">
        <div 
            class="tw-card min-w-[80px] max-w-[80%]"
            :class="[msg.sender!==$auth.user._id?'rounded-lg rounded-tl-none self-start':'rounded-lg self-end rounded-tr-none']"
            v-for="msg in data" :key="msg._id"
        >
            <p class="text-neutral-500 text-sm">{{msg.message}}</p>
            <span class="text-[10px] text-neutral-400 float-right">08:20</span>
        </div>
    </section>
</template>

<script>
export default {
    props: ['data']
}
</script>