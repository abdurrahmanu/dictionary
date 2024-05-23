<template>
  <div class="max-w-[1200px] m-auto w-[100%]">
    <Main  
    :loading="loading" 
    :data="data" 
    @word="getData($event)" 
    :wordData="wordData" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { fetchWordDefinitions } from "@/composables/fetchWordDefinitions";
import { formatWordData } from '@/composables/formatWordData'
import Main from "./components/Main.vue";

const word = ref('')
const wordData = ref({})
const data = ref({})
const loading = ref(false)

const getData = async (input) => {
  word.value = input
  wordData.value = {}
  data.value = {}

  loading.value = true
  wordData.value = await fetchWordDefinitions("https://api.dictionaryapi.dev/api/v2/entries/en/" + word.value)
  loading.value = false
  if (wordData.value.data.wordData)data.value = formatWordData(wordData.value.data)
}
</script>
