<template>
    <div v-if="data.word" class="grid w-[90%] justify-center pt-4">
        <div class="text-zinc-600 font-medium grid gap-3 p-3 pb-2">
            <div class="flex gap-2 items-center min-w-fit">
                <p class="uppercase max-w-[200px] text-lg font-mono overflow-auto">WORD: <span class="text-xl">{{ data.word }}</span></p>
                <Copy @click="copyWord(data.word)" class="w-3" />
            </div>
            <div class="">
                TRANSCRIBE: {{ data.phonetics[0].text }}
            </div>
            <div class=" flex gap-1 min-w-fit">
                <p class="">PRONOUNCE</p>
                <div v-if="data.audio_present" class="flex">
                    <audio src="" ref="audio"></audio>
                    <Audio @click="play_audio" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, defineProps, ref, watchEffect } from '@vue/runtime-core';
import Audio from "../../assets/svg/audio.vue";
import Copy from "../../assets/svg/copy.vue";

const audio = ref(null)
const props = defineProps({
    data: Object,
})

const play_audio = () => audio.value.play();
const copyWord = async (word) => {
    await navigator.clipboard.writeText(word)
}
</script>

