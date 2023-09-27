<template>
    <div class="bg-sky-900 scrollbar-thin scrollbar-thumb-green-400">
        <div v-if="isBigScreen" class="flex max-w-[1300px] bg-slate-300 m-auto">
            <div class="min-w-[300px] w-fit h-screen">
                <h1 :class="[toggleHistory ? 'bg-green-400' : 'bg-cyan-600']" @click="checkHistory" class="text-center font-mono text-lg py-[22px]">{{ toggleHistory ? 'CLOSE' : 'OPEN' }} HISTORY</h1>
                <div v-if="toggleHistory">
                    <div class="text-center font-mono font-bold text-red-400 py-1" v-if="historyIsEmpty.length">
                        {{ historyIsEmpty }}
                    </div>
                    <div class="m-auto max-w-[300px] justify-center py-2 w-fit flex gap-1 flex-wrap" v-if="previousSearch.showPreviousSearch">
                        <div @click="sendHistoryWordAsProp(_word)" class="text-center rounded-md text-sm border border-gray-500 m-[.4px] hover:text-white hover:bg-gray-500 p-1 font-mono" v-for="(_word, index) in previousSearch.previousSearchWords" :key="index">{{ _word }}</div>
                    </div>
                </div>
                <searchedWord :data="data" />
                <div v-if="data.partsOfSpeech">
                    <p class="p-2 text-center underline text-gray-700 pt-4">RELATED PARTS OF SPEECH</p>
                    <div class="uppercase flex flex-wrap justify-center font-mono">
                        <div v-for="partOfSpeech in data.partsOfSpeech" class="p-2 hover:bg-white transition delay-75">
                            {{ partOfSpeech.partOfSpeech }}
                        </div>
                    </div>
                </div>
                <skeletonLoader2 v-if="!data.word && loadingData" />
            </div>
            <div class="w-full scrollbar-thin scrollbar-thumb-blue-200  h-screen overflow-y-scroll relative bg-slate-100">
                <h2 class="p-5 text-2xl font-mono w-full bg-cyan-700 text-zinc-200 text-center font-bold">ENGLISH DICTIONARY</h2>
                <customForm 
                :historyWord="historyWord"
                :data="data"
                @inputEvent="inputEvent = $event"
                @word="$emit('word', $event)" />
                
                <wordDefinitions 
                v-if="data.word && !loadingData" 
                :data="data" />
                
                <skeletonLoader v-else-if=" !data.word && loadingData"/>
                
                <messageBox
                v-if="!loadingData && !data.word"
                :loadingData="loadingData"
                :word="word"
                :wordData="wordData"
                :inputEvent="inputEvent" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref, defineProps, defineEmits } from 'vue';
import skeletonLoader from '../components/Desktop/skeletonLoader.vue';
import skeletonLoader2 from '../components/Desktop/skeletonLoader2.vue';
import searchedWord from '../components/Desktop/searchedWord.vue'
import { useScreenSize } from '@/composables/useScreenSize';
import { searchHistory } from '@/composables/searchHistory'
import customForm from '../components/Desktop/customForm.vue';
import messageBox from '../components/Desktop/messageBox.vue';
import wordDefinitions from '../components/Desktop/wordDefinitions.vue'
const { isBigScreen } = useScreenSize()

const emit = defineEmits(['word'])
const word = ref('')
const historyWord = ref('')
const previousSearch = ref({})
const toggleHistory = ref(false)
const inputEvent = ref('')
const historyIsEmpty = ref('')
const props = defineProps({ wordData: Object, data: Object, loadingData: Boolean })

const sendHistoryWordAsProp = (_word) => {
    word.value = _word
    historyWord.value = _word
}

watchEffect(() => {
    if (word.value.length) {
        emit('word', word.value)
    }
})

const checkHistory = () => {
    toggleHistory.value = !toggleHistory.value
    if (toggleHistory.value) {
        previousSearch.value = searchHistory();
        if (!previousSearch.value.previousSearchWords.length) {
            historyIsEmpty.value = 'No History'
            setTimeout(() => {
                toggleHistory.value = false
                historyIsEmpty.value = ''
            }, 1000);
        }
    }
};

</script>
