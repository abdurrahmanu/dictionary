<template>
    <div>
        <button @click="$emit('partOfSpeechName', partOfSpeech)" class="bg-orange-600 text-white rounded-2xl p-2 px-5 hover:bg-orange-400 transition all ease-linear shadow-sm shadow-orange-700">
            {{ partOfSpeech }}
        </button>
        
        <Suspense>
        <div class="w-10 h-5 rounded-xl bg-gradient-tr from-gray-300 via-white to-transparent"></div>
        </Suspense>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    partOfSpeech: String,
})
</script>

<style>

</style>