<template>
    <div class="w-full">
        <form @submit.prevent="$emit('get_data')" class="flex justify-center fixed w-full md:w-[40%] -mt-5 md:mt-5">
            <input
            class="bg-transparent md:scale-110 h-10 md:m-0 m-auto rounded-full w-[80%] bg-white font-mono p-2 px-5 outline-none shadow-sm shadow-blue-300"
            type="search"
            placeholder="Search"
            ref="search"
            v-model="value"
            @input="$emit('value', value)"
            />
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const value = ref()
const props = defineProps({
    result: Object,
})
</script>
