<template>
    <div class="w-full m-auto bg-gray-200 box-border p-2 rounded-lg">
        <h2 class="text-blue-500 text-2xl text-center uppercase">
            {{ partOfSpeech.partOfSpeech }}
        </h2>
        <div class="">
                <div>
                    <ul>
                        <li v-for="definition in partOfSpeech.definitions" :key="definition"
                        class="list-disc list-inside font-mono p-1 font-bold text-gray-800"
                    >
                        {{ definition.definition }}
                        </li>
                    </ul>

                    <div class="font-mono text-lg grid gap-2 mt-5">
                        <div
                        class="flex flex-wrap items-center"
                        v-if="partOfSpeech.antonyms.length"
                    >
                        <p class="text-2xl">ANTONYMS:</p>
                        <ul class="flex gap-1 flex-wrap">
                            <li v-for="antonym of partOfSpeech.antonyms" :key="antonym" class="text-lg">
                            {{ antonym
                            }}{{
                                partOfSpeech.antonyms[partOfSpeech.antonyms.length - 1] === antonym ? "." : ", "
                            }}
                            </li>
                        </ul>
                        </div>

                        <div
                        class="flex flex-wrap items-center"
                        v-if="partOfSpeech.synonyms.length"
                        >
                        <p class="text-2xl">SYNONYMS:</p>
                        <ul class="flex gap-1 flex-wrap">
                            <li :key="synonym" v-for="synonym of partOfSpeech.synonyms" class="text-lg">
                            {{ synonym
                            }}{{
                                partOfSpeech.synonyms[partOfSpeech.synonyms.length - 1] === synonym ? "." : ","
                            }}
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
        </div>

        </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import searchedWord from './searchedWord.vue';

const props = defineProps({
    partOfSpeech: Object,
})
const active_part_of_speech = ref('')

</script>

<style>
</style>