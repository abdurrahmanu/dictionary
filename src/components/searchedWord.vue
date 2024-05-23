<template>
    <div :class="[toggleHistory ? 'top-[127px]' : 'top-[92px]']" class="fixed z-10 w-full left-0 bg-slate-100 shadow-md shadow-gray-300">
        <div class="flex items-center m-auto">
            <div class="text-zinc-600 py-1 border-r border-gray-300 w-fit font-black items-center">
                <div v-if="data.word" class="gap-4 px-10 flex justify-center min-w-fit items-center">
                    <p class="uppercase max-w-[200px] font-mono text-lg overflow-auto">
                        {{ data.word }}
                    </p>
                    <Copy @click="copyWord(data.word)" class="" />
                </div>
                <div v-else class="h-20">

                </div>
                <div v-if="data.word" class=" flex gap-4 p-2 pl-5 min-w-fit justify-center items-center">
                    <p>AUDIO</p>
                    <div v-if="data.audio_present" class="flex">
                        <audio src="" ref="audio"></audio>
                        <Audio @click="play_audio" />
                    </div>
                </div>
            </div>
            <div v-if="data.word" class="pl-4 text-xl font-medium">
                {{ data.phonetics[0].text }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, defineProps, ref, watchEffect } from '@vue/runtime-core';
import Audio from "./svg/audio.vue";
import Copy from "./svg/copy.vue";

const audio = ref(null)
const props = defineProps({
    data: Object,
    toggleHistory: Boolean
})

const play_audio = () => audio.value.play();
const copyWord = async (word) => {
    await navigator.clipboard.writeText(word)
}
</script>

