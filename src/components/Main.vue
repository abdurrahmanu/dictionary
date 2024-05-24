<template>
    <div class="h-[100dvh] max-h-[100dvh] overflow-x-auto text-slate-300 bg-neutral-900">
        <header class="p-2 py-[10px] text-base sticky top-0 w-full  font-mono font-bold bg-neutral-800 text-zinc-300 flex justify-between items-center z-[999]">
            <p class="text-lg px-3">DICTIONARY</p>
            <Search :data="data" @word="$emit('word', $event)" />
        </header>
        <Message v-if="!loading && !data.word" :word="word" :data="wordData.data" />
        <Definitions v-if="data.word" :data="data" />
        <Loader v-if="loading" />
        <div v-if="data.word" class="text-right text-[9px] italic p-1" dir="right">For more: <a :href="data.sourceUrl" class="text-blue-400 underline">{{ data.sourceUrl }}</a></div>
    </div>
</template>

<script setup>
import Loader from './Loader.vue'
import Message from './Message.vue';
import Search from './Search.vue';
import Definitions from './Definitions.vue';
import { ref } from 'vue';

const word = ref('')
const props = defineProps({
    wordData: Object,
    data: Object,
    loading: Boolean
})
</script>










