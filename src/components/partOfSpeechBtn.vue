<template>
    <div>
        <Suspense>
            <template #default>
                <button @click="$emit('partOfSpeechName', partOfSpeech)" class="bg-[#dcefef] text-[#5ba4a4] rounded-2xl p-2 px-5  transition all ease-linear">
                    {{ partOfSpeech }}
                </button>
            </template>
        
            <template #fallback>
                <div class="w-10 h-5 rounded-xl bg-gradient-tr from-gray-300 via-white to-transparent"></div>
            </template>
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
a {
    background: #dcefef;
    background: #deeded;
}
</style>