<template>
    <div class="bg-slate-200 w-full top-0 shadow-sm shadow-gray-200 left-0 sticky">
        <div class="h-[70px] ">
            <form @submit.prevent="submit" class="w-[90%] py-3 px-5 m-auto">
                <input
                class="bg-transparent h-10 rounded-full bg-zinc-100 font-mono w-[70%] max-w-[500px] p-2 px-5 outline-none border"
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
import { ref, defineProps, defineEmits, watch, watchEffect, onMounted } from "vue";

const word = ref('')
const inputEvent = ref('')
const search = ref(null)
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

onMounted(() => {
    search.value.focus()
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
</script>
