<template>
    <div class="flex items-center uppercase font-bold gap-5 text-lg py-2 pl-5 flex-wrap sticky top-[48px] z-[2] px-2 bg-neutral-700 md:sticky md:bg-transparent md:top-[48px] h-fit">
        <p class="flex items-center space-x-4">
            <span>{{ data.word }}</span>
            <Copy @click="copyWord(data.word)" :class="w-4" />
        </p>

        <p class="flex items-center space-x-4">
            <p>AUDIO</p>
            <div v-if="data.audio_present">
                <audio src="" ref="audio"></audio>
                <Audio @click="play_audio" />
            </div>
        </p>

        <p class="flex items-center space-x-4">
            <span>{{ data.phonetics[0].text }}</span>
            <copy @click="copyWord(data.word)" :class="w-4" />
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Audio from "./svg/audio.vue";
import copy from "./svg/copy.vue";

const audio = ref(null)
const props = defineProps({
    data: Object,
})

const play_audio = () => audio.value.play();
const copyWord = async (word) => {
    await navigator.clipboard.writeText(word)
}
</script>

