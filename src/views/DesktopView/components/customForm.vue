<template>
    <div class="bg-slate-100 w-full top-0 shadow-sm shadow-gray-200 left-0 sticky">
        <div class="h-[70px] ">
            <form @submit.prevent="submit" class="w-[90%] py-3 px-5 m-auto">
                <input
                class="bg-transparent h-10 rounded-full bg-slate-200 font-mono w-[70%] max-w-[500px] p-2 px-5 outline-none border"
                type="search"
                placeholder="Search"
                ref="search"
                v-model="word"
                @input="inputEvent = $event.target.value"
                />
            </form>
        </div>
    </div>
</template>

<script setup>
import searchSvg from '../../../assets/svg/search.vue'
import { ref, defineProps, defineEmits, watch, watchEffect } from "vue";

const openDrop = ref(false)
const word = ref('')
const inputEvent = ref('')
const search = ref()
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
})

const submit = (e) => {
    if (word.value.length) {
        if (props.data.word === word.value) {
        }
        else {
            emit('word', word.value)
            inputEvent.value = ''
            openDrop.value = false
        }
    }
    else return
}
</script>
