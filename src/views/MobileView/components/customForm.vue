<template>
    <div class="p-1">
        <div class="w-fit m-auto transition-all delay-75">
            <form @submit.prevent="submit" class="grid justify-center">
                <div class="flex relative">
                    <searchSvg 
                    :class="[collapseInput && !Array.from(data).length ? 'left-[50%] translate-x-[-50%]' : 'left-3']"
                    class="absolute top-[50%] translate-y-[-50%]" />
                    <input
                    :class="[collapseInput && !Array.from(data).length ? 'w-10 h-10' : 'max-w-[90%] w-[300px] pl-10 h-10']"
                    class="border-2 transition-all duration-150 p-1 border-teal-700 bg-white font-mono outline-none text-base rounded-full"
                    type="search"
                    :placeholder="collapseInput ? '' : 'word'"
                    ref="search"
                    v-model="word"
                    @input="inputEvent = $event.target.value" />
                </div>
            </form>
            <div class="w-fit pt-1" v-if="openDrop">
                <div class="bg-gray-300 w-fit max-w-full">
                    <ul>
                        <li v-for="index in 5" :key="index" class="pr-5 hover:bg-white hover:text-gray-600 border border-gray-400 p-2 text-xs">{{inputEvent}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import searchSvg from '../../../assets/svg/search.vue'
import { ref, defineProps, defineEmits, onMounted, watchEffect } from "vue";

const openDrop = ref(false)
const word = ref('')
const inputEvent = ref('')
const search = ref(null)
const collapseInput = ref(true)
const emit = defineEmits(['word', 'inputEvent'])

const props = defineProps({
    data: Object,
    historyWord: String
})

//OPEN DROPDOWN FOR TEXT SEARCH

// watchEffect(() => {
//     if (!word.value.length) openDrop.value = false
//     emit('inputEvent', inputEvent.value)
//     if (inputEvent.value.length) openDrop.value = true
// })

watchEffect(() => {
    if (props.historyWord.length) {
        word.value = props.historyWord
    }

    if (inputEvent.value) {
        emit('inputEvent', inputEvent.value)
    }
})

const submit = (e) => {
    if (word.value.length) {
        if (props.data.word === word.value) return
        else {
            emit('word', word.value)
            inputEvent.value = ''
            openDrop.value = false
        }
    }
    else return
}

onMounted(() => {
    setTimeout(() => {
        collapseInput.value = false
    }, 200);
    search.value.focus()
})
</script>
