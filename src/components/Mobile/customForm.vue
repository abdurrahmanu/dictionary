<template>
    <div class="p-1 bg-slate-200">
        <div class="w-fit m-auto transition-all delay-75">
            <form @submit.prevent="submit" class="grid justify-center">
                <div class="flex relative">
                    <input
                    :class="['max-w-[90%] w-[300px] pl-10 h-10']"
                    class="transition-all duration-150 p-1 bg-white font-mono outline-none text-base rounded-full"
                    type="search"
                    :placeholder="collapseInput ? '' : 'word'"
                    ref="search"
                    v-model="word"
                    @input="inputEvent = $event.target.value" />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watchEffect } from "vue";

const word = ref('')
const inputEvent = ref('')
const search = ref(null)
const collapseInput = ref(true)
const emit = defineEmits(['word', 'inputEvent'])

const props = defineProps({
    data: Object,
    historyWord: String
})

watchEffect(() => {
    if (inputEvent.value) {
        emit('inputEvent', inputEvent.value)
    }
})

const submit = (e) => {
    if (word.value.length) {
        if (props.data.word === word.value) return
        else {
            emit('word', word.value)
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
