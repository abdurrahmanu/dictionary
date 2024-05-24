<template>
  <div class="md:flex">
    <Word :data="data" />
      <div class="pt-3 text-slate-400 md:w-full  min-h-[calc(100dvh_-_48px)] md:shadow-md md:hover:shadow-neutral-900 md:shadow-black">
        <div v-for="(partOfSpeech, index) in data.partsOfSpeech" :key="index" class="border-b border-b-neutral-600 pb-5 px-4">
            <h2 class="uppercase pt-5">{{ partOfSpeech.partOfSpeech }}</h2>
            <div>
              <div class="space-y-1">
                <p
                class="flex w-fit text-sm space-x-1"
                :key="index"                  
                @mouseleave="hoverIndex = null"
                v-for="(definition, index) in partOfSpeech.definitions"
                  @mouseover="showCopyIcon(index, partOfSpeech.partOfSpeech)">
                  <span class="px-1">{{ index  + 1}}.</span><span>{{ definition.definition }}</span>
                </p>
              </div>
              <div v-if="partOfSpeech.antonyms.length || partOfSpeech.synonyms.length" class="flex w-fit border-slate-600 border mt-5 ml-4">
                <div
                  class="border-neutral-600 border-r max-w-[300px]"
                  v-if="partOfSpeech.antonyms.length">
                  <p class="text-center px-2 font-mono border-b border-b-neutral-500">ANTONYMS</p>
                  <div class="flex gap-1 text-sm flex-wrap p-2">
                    <span
                    :key="index"
                    v-for="(antonym, index) of partOfSpeech.antonyms">
                      {{ antonym}},
                    </span>
                  </div>
                </div>
                <div
                  class="w-full max-w-[300px]"
                  v-if="partOfSpeech.synonyms.length">
                  <p class="px-2 font-mono border-b border-b-neutral-500">SYNONYMS</p>
                  <div class="flex gap-1 text-sm flex-wrap p-2">
                    <span
                      :key="index"
                      v-for="(synonym, index) of partOfSpeech.synonyms">
                      {{ synonym}},
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Word from './Word.vue'

const props = defineProps({ 
  data: Object, 
  toggleHistory: Boolean
})

const toggleCopyIcon = ref(false)
const hoverIndex = ref(null)
const hoverPartOfSpeech = ref('')
const copiedText = ref(false)
const showCopyIcon = (index, partOfSpeech) => {
  hoverIndex.value = index
  hoverPartOfSpeech.value = partOfSpeech
  toggleCopyIcon.value = true
}

const copyDefinitionToClipBoard = async (definition) => {
  copiedText.value = true
  await navigator.clipboard.writeText(definition).then(() => {
    copiedText.value = false
  })
}
</script>
