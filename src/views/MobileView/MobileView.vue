<template>
    <div v-if="!isBigScreen" :class="[data.word || (toggleHistory && data.word) ? 'pt-[197px]' : 'pt-48']" class="bg-slate-100 min-h-screen relative">
        <h2 class="p-5 py-2 text-xl fixed top-0 w-full font-mono font-medium bg-slate-800 text-center text-gray-400">
            <span @click="checkHistory" class="text-xs absolute left-3 top-[50%] translate-y-[-50%] text-white">HISTORY</span> ENGLISH DICTIONARY</h2>
            <div class="w-full bg-white h-fit fixed left-0 top-[44px] shadow-sm shadow-gray-300 z-30" v-if="toggleHistory">
                <div class="text-center font-mono font-bold text-red-400 py-1" v-if="historyIsEmpty.length">
                    {{ historyIsEmpty }}
                </div>
                <div v-else class="flex overflow-x-scroll scrollbar-track-blue-200 scrollbar-thin">
                    <div @click="sendHistoryWordAsProp(_word)" class="text-center uppercase text-[10px] px-2 py-3 hover:bg-slate-300" v-for="(_word, index) in previousSearch.previousSearchWords" :key="index">{{ _word }}</div>
                </div>
            </div>
                <div>
                <div :class="[toggleHistory ? 'top-[82px]' : 'top-[44px]']" class="w-full fixed left-0 bg-slate-100">
                    <CustomForm 
                    :historyWord="historyWord"
                    :data="data"
                    @inputEvent="inputEvent = $event"
                    @word="word = $event" />
                </div>

                <searchWord 
                :toggleHistory="toggleHistory" 
                :data="data"/>


                <wordDefinitions 
                :toggleHistory="toggleHistory"
                v-if="data.word && !loadingData" 
                :data="data" />
        
                <div v-else-if="!data.word && loadingData">
                    <div class="w-[90%] m-auto">
                        <div class="flex w-full m-auto py-3">
                            <div class="h-20 w-[50%] bg-gray-200"></div>
                            <div class="h-20 w-[50%] bg-gray-300"></div>
                        </div>
                    
                        <div class="w-full bg-white h-fit py-4">
                            <div class="w-full h-fit p-3" v-for="i in 2" :key="i">
                                <p class="ml-1 w-10 bg-gray-300 h-5"></p>
                                <div class="bg-gray-200 h-5 m-1 w-full"></div>
                                <div class="bg-gray-200 h-5 m-1 w-[70%]"></div>
                                <div class="bg-gray-200 h-5 m-1 w-[50%]"></div>
                                <div class="bg-gray-200 h-5 m-1 w-[90%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
        
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
import searchWord from './components/searchWord.vue'
import messageBox from './components/messageBox.vue';
import CustomForm from './components/customForm.vue';
import wordDefinitions from './components/wordDefinitions.vue';
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
const props = defineProps({ wordData: Object, data: Object, loadingData: Boolean})

watchEffect(() => {
    if (word.value.length) {
        emit('word', word.value)
    }

    if (inputEvent.value) {
        toggleHistory.value = false
        previousSearch.value = {}
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
    } else {
        previousSearch.value = {}
    }
};

const sendHistoryWordAsProp = (_word) => {
    word.value = _word
    historyWord.value = _word
}

</script>