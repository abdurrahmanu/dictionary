<template>
    <div  class="bg-slate-400 h-[100dvh] max-h-[100dvh] relative ">
        <header class="p-2 py-[10px] text-base sticky top-0 w-full  font-mono font-bold bg-neutral-900 text-zinc-300 flex justify-between items-center">
            <p class="text-lg px-3">DICTIONARY</p>
            <CustomForm :data="data" @word="$emit('word', $event)" />
        </header>

        <div>
            <searchedWord 
            v-if="data.word && !loading"
            :toggleHistory="toggleHistory" 
            :data="data"/>
            <skeletonLoader1 v-else-if="!data.word && loading" />

            <wordDefinitions 
            :toggleHistory="toggleHistory"
            v-if="data.word && !loading" 
            :data="data" />
            <skeletonLoader v-else-if="!data.word && loading" />
    
            <messageBox
            v-if="!loading && !data.word"
            :loading="loading"
            :word="word"
            :wordData="wordData"
            :inputEvent="inputEvent" />
        </div>
    </div>
</template>

<script setup>
import skeletonLoader from './skeletonLoader.vue'
import skeletonLoader1 from './skeletonLoader1.vue'
import searchedWord from './searchedWord.vue'
import messageBox from './messageBox.vue';
import CustomForm from './customForm.vue';
import wordDefinitions from './wordDefinitions.vue';
import { watchEffect, ref } from 'vue';

const emit = defineEmits(['word'])
const toggleHistory = ref(false)
const word = ref('')
const inputEvent = ref('')
const props = defineProps({
    wordData: Object,
    data: Object,
    loading: Boolean
})

watchEffect(() => {
    if (word.value.length) {
        emit('word', word.value)
    }
})
</script>



