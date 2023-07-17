<template>
    <div class="bg-black scrollbar-thin scrollbar-thumb-green-400">
        <div v-if="isBigScreen" class="flex max-w-[1300px] bg-slate-100 m-auto">
            <div class="min-w-[300px] w-fit h-screen">
                <h1 @click="search" class="text-center font-mono py-[2px] bg-gray-300 text-lg hover:bg-gray-200">{{ previousSearch.showPreviousSearch ? 'CLOSE' : 'OPEN HISTORY' }}</h1>
                <div class="m-auto max-w-[300px] justify-center py-2 w-fit flex flex-wrap" v-if="previousSearch.showPreviousSearch">
                    <div @click="sendHistoryWordAsProp(_word)" class="text-center border m-[.4px] hover:text-white hover:bg-gray-500 border-gray-300 p-1 font-mono" v-for="(_word, index) in previousSearch.previousSearchWords" :key="index">{{ _word }}</div>
                </div>
                <searchWord :data="data" />
                <div v-if="data.partsOfSpeech">
                    <p class="p-2 text-center underline text-gray-700 pt-4">RELATED PARTS OF SPEECH</p>
                    <div class="uppercase flex flex-wrap justify-center font-mono">
                        <div v-for="partOfSpeech in data.partsOfSpeech" class="p-2 hover:bg-white transition delay-75">
                            {{ partOfSpeech.partOfSpeech }}
                        </div>
                    </div>
                </div>
                <div v-if="!data.word && loadingData" class="pt-5">
                    <div class="w-[90%] m-auto pt-5 pl-20">
                        <div class="bg-gray-200 h-6 w-[70%] mb-1"></div>
                        <div class="bg-gray-200 h-6 w-[75%] mb-1"></div>
                        <div class="bg-gray-200 h-6 w-[70%] mb-1"></div>
                    </div>
                    <div class="w-[90%] m-auto pt-10">
                        <div class="bg-gray-200 h-3 w-[20%] m-auto mb-1"></div>
                        <div v-for="i in 3" :key="i" class="bg-gray-200 h-5 w-[40%] m-auto mb-1"></div>
                    </div>
                </div>
            </div>
            <div class="w-full scrollbar-thin scrollbar-thumb-blue-200  h-screen overflow-y-scroll relative bg-white">
                <h2 class="p-5 text-2xl font-mono font-medium w-full bg-slate-800 text-center text-gray-400">ENGLISH DICTIONARY</h2>
                <customForm 
                :historyWord="historyWord"
                :data="data"
                @inputEvent="inputEvent = $event"
                @word="word = $event" />
                
                <wordDefinitions 
                v-if="data.word && !loadingData" 
                :data="data" />
                
                <div v-else-if=" !data.word && loadingData">
                    <div class="w-[90%] m-auto">
                        <div class="w-full bg-white h-fit py-4">
                            <div class="w-full h-fit p-3" v-for="i in 2" :key="i">
                                <p class="ml-1 w-10 bg-gray-300 h-3"></p>
                                <div class="bg-gray-200 h-5 m-1 w-full"></div>
                                <div class="bg-gray-200 h-5 m-1 w-[70%]"></div>
                                <div class="bg-gray-200 h-5 m-1 w-[50%]"></div>
                                <div class="bg-gray-200 h-5 m-1 w-[90%]"></div>
                                <div class="m-auto mt-3 w-[40%] h-12 bg-gray-200"></div>
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
    </div>
</template>

<script setup>
import { watchEffect, ref, defineProps, defineEmits } from 'vue';
import searchWord from './components/searchWord.vue'
import { useScreenSize } from '@/composables/useScreenSize';
import { searchHistory } from '@/composables/searchHistory'
import customForm from './components/customForm.vue';
import messageBox from './components/messageBox.vue';
import wordDefinitions from './components/wordDefinitions.vue'
const { isBigScreen } = useScreenSize()

const emit = defineEmits(['word'])
const word = ref('')
const historyWord = ref('')
const previousSearch = ref({})
const toggleHistory = ref(false)
const inputEvent = ref('')
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

const search = () => {
    toggleHistory.value = !toggleHistory.value
    if (toggleHistory.value) {
        previousSearch.value = searchHistory();
    } else {
        previousSearch.value = {}
    }
};
</script>

<style lang="scss" scoped>

</style>