<template>
        <input
        class="transition-all duration-150 px-1 border-b border-b-white font-mono outline-none text-base max-w-[200px] w-[90%] bg-transparent"
        type="text"
        ref="inputEl"
        v-model="word" 
        :placeholder="'word'"
        @keyup.enter="word.length ? submit() : ''" />
    </template>

<script setup>
import { ref, watch } from "vue";

const word = ref('')
const emit = defineEmits(['word'])
const props = defineProps({
    data: Object,
})

const dictionaryCharacters = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9, 
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20, 
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
    '-': 27
}

watch(word, (newVal) => {
    let lastChar = newVal[newVal.length - 1]
    if (!dictionaryCharacters[lastChar] || (newVal[newVal.length - 2] === lastChar && lastChar === '-')) {
        word.value = word.value.slice(0, newVal.length - 1)
    }
})

const submit = (e) => {
    if (word.value.length) {
        if (props.data.word === word.value) return
        else emit('word', word.value)
    }
}
</script>
