<template>
  <input
    class="px-1 border-b border-b-slate-400 font-mono outline-none text-sm max-w-[200px] w-[90%] bg-transparent"
    type="text"
    v-model="word"
    :placeholder="'word'"
    @keyup.enter="word.length ? submit() : ''"
  />
</template>

<script setup>
import { ref, watch } from "vue";

const word = ref('');
const emit = defineEmits(['word']);
const props = defineProps({
  data: Object,
});

const dictionaryCharacters = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7,
  h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14,
  o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21,
  v: 22, w: 23, x: 24, y: 25, z: 26, '-': 27
};

watch(word, (newVal, oldVal) => {
  if (!newVal) return;

  const clean = [];
  for (let i = 0; i < newVal.length; i++) {
    const char = newVal[i].toLowerCase();
    const prevChar = clean[clean.length - 1];

    if (!dictionaryCharacters[char]) continue;
    if (char === '-' && prevChar === '-') continue;

    clean.push(char);
  }

  const cleanedWord = clean.join('');
  if (cleanedWord !== newVal) {
    word.value = cleanedWord;
  }
});

const submit = () => {
  const submittedWord = word.value.toLowerCase();
  if (submittedWord.length && props.data.word !== submittedWord) {
    emit('word', submittedWord);
  }
};
</script>