<template>
    <div v-if="!isBigScreen" :class="[toggleHistory ? 'pt-[185px]' : data.word ? 'pt-[155px]' : 'pt-40']" class="bg-slate-100 min-h-screen relative">
        <h2 class="p-5 py-[10px] z-30 text-base fixed top-0 w-full  font-mono font-bold bg-cyan-700 text-center text-zinc-300">
            <span :class="[toggleHistory ? 'bg-green-400' : 'bg-cyan-600']" @click="checkHistory" class="text-base absolute left-0 top-[50%] translate-y-[-50%] p-2 text-black font-bold">HISTORY</span> 
            <span>ENGLISH DICTIONARY</span>
        </h2>
        <div class="w-full bg-white h-fit fixed left-0 top-[44px] shadow-sm shadow-gray-300 z-30" v-if="toggleHistory">
            <div class="text-center font-mono font-bold text-red-400 py-1" v-if="historyIsEmpty.length">
                {{ historyIsEmpty }}
            </div>
            <div v-else class="flex justify-center py-1 bg-slate-200 overflow-x-scroll gap-[2px] scrollbar-track-blue-200 scrollbar-thin">
                <div @click="sendHistoryWordAsProp(_word)" class="text-center uppercase text-[10px] px-2 py-2 border rounded-md border-gray-400 hover:bg-slate-300" v-for="(_word, index) in previousSearch.previousSearchWords" :key="index">{{ _word }}</div>
            </div>
        </div>
        <div>
            <div :class="[toggleHistory ? 'top-[82px]' : 'top-[44px]']" class="w-full fixed z-30 left-0 bg-slate-100">
                <CustomForm 
                :historyWord="historyWord"
                :data="data"
                @inputEvent="inputEvent = $event"
                @word="$emit('word', $event)" />
            </div>

            <searchedWord 
            v-if="data.word && !loadingData"
            :toggleHistory="toggleHistory" 
            :data="data"/>
            
            <skeletonLoader1 v-else-if="!data.word && loadingData" />

            <wordDefinitions 
            :toggleHistory="toggleHistory"
            v-if="data.word && !loadingData" 
            :data="data" />

            <skeletonLoader v-else-if="!data.word && loadingData" />
    
            <messageBox
            v-if="!loadingData && !data.word"
            :loadingData="loadingData"
            :word="word"
            :wordData="wordData"
            :inputEvent="inputEvent" />
        </div>
    </div>
</template>

<script setup>
import { useScreenSize } from '@/composables/useScreenSize';
import skeletonLoader from '../components/Mobile/skeletonLoader.vue'
import skeletonLoader1 from '../components/Mobile/skeletonLoader1.vue'
import searchedWord from '../components/Mobile/searchedWord.vue'
import messageBox from '../components/Mobile/messageBox.vue';
import CustomForm from '../components/Mobile/customForm.vue';
import wordDefinitions from '../components/Mobile/wordDefinitions.vue';
import { searchHistory } from '@/composables/searchHistory';
import { watchEffect, ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['word'])
const { isBigScreen } = useScreenSize()
const toggleHistory = ref(false)
const previousSearch = ref({})
const historyWord = ref('')
const word = ref('')
const inputEvent = ref('')
const historyIsEmpty = ref('')
const props = defineProps({
    wordData: Object,
    data: Object,
    loadingData: Boolean
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
    } else historyWord.value = ''
};

const sendHistoryWordAsProp = (_word) => {
    word.value = _word
    historyWord.value = _word
}

watchEffect(() => {
    if (word.value.length) {
        emit('word', word.value)
    }
})

</script>



