<template>
  <DesktopView 
  :loadingData="loadingData" 
  :data="formattedData" 
  @word="newSearch($event)" 
  :wordData="wordData" />

  <MobileView  
  :loadingData="loadingData" 
  :data="formattedData" 
  @word="newSearch($event)" 
  :wordData="wordData" />
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { fetchWordDefinitions } from "@/composables/fetchWordDefinitions";
import { wordInLocalStorage } from "@/composables/wordInLocalStorage";
import { formatWordData } from '@/composables/formatWordData'
import DesktopView from './DesktopView/DesktopView.vue'
import MobileView from "./MobileView/MobileView.vue";

const word = ref('')
const wordData = ref({})
const formattedData = ref({})
const loadingData = ref(false)

const newSearch = (e) => {
  wordData.value = {}
  formattedData.value = {}
  word.value = e
}

watchEffect(async () => {
  if (word.value.length) {
    let localStorageEntry = wordInLocalStorage(word)

    if (localStorageEntry.exists.value) {
      formattedData.value = localStorageEntry.wordData.value[0]
    } else {
      loadingData.value = true
      wordData.value = await fetchWordDefinitions("https://api.dictionaryapi.dev/api/v2/entries/en/" + word.value)
      loadingData.value = false

      if (wordData.value.data.wordData) {
        formattedData.value = formatWordData(wordData.value.data)
  
        if (localStorage.getItem('dictionaryHistoryArray')) {
          let previousHistory = ref(JSON.parse(localStorage.getItem('dictionaryHistoryArray')))
          if (previousHistory.value.length > 9) {
            previousHistory.value.shift()
            previousHistory.value.push(formattedData.value)
            localStorage.setItem('dictionaryHistoryArray', JSON.stringify(previousHistory.value))
          }
          else {
            previousHistory.value.push(formattedData.value)
            localStorage.setItem('dictionaryHistoryArray', JSON.stringify(previousHistory.value))
          }
        } else {
          let newArray = []
          newArray[0] = formattedData.value
          localStorage.setItem('dictionaryHistoryArray', JSON.stringify(newArray))
        }
      }
    }
  }
})



</script>
