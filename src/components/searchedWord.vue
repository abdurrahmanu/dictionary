<template>
    <transition name="move">
        <div class="grid justify-center text-gray-800 bg-blue-300 w-fit m-auto max-w-[90%] items-center mt-10 border mb-10 border-blue-600 rounded-lg shadow-blue-900 shadow-md">
            <div class="gap-4 px-7 py-5 flex justify-center min-w-fit w-[50%] items-center">
                <p class="uppercase font-mono text-5xl">{{ data.word }}</p>
                <Copy class="" />
            </div>
            <div class=" flex gap-4 pb-5 px-7 w-[50%] min-w-fit justify-center items-center">
                <p class="text-4xl font-bold">{{ data.phonetic }}</p>
                <div v-if="audio_present" class="flex">
                    <audio :src="data.phonetics[0].audio" ref="audio"></audio>
                    <Audio @click="$emit('play_audio')" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import Audio from "../assets/svg/audio.vue";
import Copy from "../assets/svg/copy.vue";

export default {
    components: {
        Audio,
        Copy,
    },
    props: {
        data: Object,
        audio_present: Boolean,
    },
};
</script>

<style></style>
