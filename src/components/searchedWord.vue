<template>
    <div class="w-full">
        <div class="flex justify-center h-14 text-gray-800 m-auto max-w-[90%] w-fit items-center rounded-lg">
            <div class="gap-4 p-2 px-7 flex justify-center min-w-fit items-center">
                <p class="uppercase font-mono text-2xl">{{ data.word }}</p>
                <Copy class="" />
            </div>
            <div class=" flex gap-4 p-2 px-7 min-w-fit justify-center items-center">
                <p class="text-2xl font-bold">{{ data.phonetic }}</p>
                <div v-if="audio_present" class="flex">
                    <audio :src="data.phonetics[0].audio" ref="audio"></audio>
                    <Audio @click="$emit('play_audio')" />
                </div>
            </div>
        </div>
    </div>
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
