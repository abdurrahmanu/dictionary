<template>
  <div class="">
    <div class="p-2">
      <div class="" v-for="(partOfSpeech, index) in data.partsOfSpeech" :key="index">
        <div class=" p-2">
          <h2 class="text-[#479292] underline uppercase">
            {{ partOfSpeech.partOfSpeech }}
          </h2>
          <div class="text-teal-900">
            <div>
              <ul>
                <li
                  v-for="(definition, index) in partOfSpeech.definitions"
                  :key="index"
                  @mouseleave="hoverIndex = null"
                  @mouseover="showCopyIcon(index, partOfSpeech.partOfSpeech)"
                  class="list-disc flex items-center relative w-fit list-inside font-serif text-sm p-1 "
                >
                  {{ definition.definition }}
                  <span v-if="toggleCopyIcon && hoverIndex === index && hoverPartOfSpeech == partOfSpeech.partOfSpeech && !copiedText" class="absolute left-[100%] pl-[2px]">
                    <CopySvg @click="copyDefinitionToClipBoard(definition.definition)" />
                  </span>
                  <span v-if="copiedText && hoverIndex === index && hoverPartOfSpeech === partOfSpeech.partOfSpeech" class="text-[9px] px-1 text-gray-600">copied</span>
                </li>
              </ul>
      
              <div class="font-mono flex m-auto w-[90%] border-black border mt-5">
                <div
                  class="border-black border-r"
                  v-if="partOfSpeech.antonyms.length"
                >
                  <p class="font-black bg-gray-300 text-center px-2">ANTONYMS:</p>
                  <ul class="flex gap-1 text-sm flex-wrap p-2">
                    <li
                      v-for="(antonym, index) of partOfSpeech.antonyms"
                      :key="index"
                      class=""
                    >
                      {{ antonym
                      }}{{
                        partOfSpeech.antonyms[partOfSpeech.antonyms.length - 1] ===
                        antonym
                          ? "."
                          : ", "
                      }}
                    </li>
                  </ul>
                </div>
      
                <div
                  class="w-full"
                  v-if="partOfSpeech.synonyms.length"
                >
                  <p class=" font-black bg-gray-300 text-center">SYNONYMS:</p>
                  <ul class="flex gap-1 text-sm flex-wrap p-2">
                    <li
                      :key="index"
                      v-for="(synonym, index) of partOfSpeech.synonyms"
                      class=""
                    >
                      {{ synonym
                      }}{{
                        partOfSpeech.synonyms[partOfSpeech.synonyms.length - 1] ===
                        synonym
                          ? "."
                          : ","
                      }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-3 italic text-sm">
      <p class="text-center">For more: <a :href="data.sourceUrl" class="text-blue-400 underline">{{ data.sourceUrl }}</a></p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import CopySvg from "../../assets/svg/copy.vue";


const props = defineProps({ data: Object })
const toggleCopyIcon = ref(false)
const hoverIndex = ref(null)
const copiedText = ref(false)
const hoverPartOfSpeech = ref('')
const showCopyIcon = (index, partOfSpeech) => {
  hoverPartOfSpeech.value = partOfSpeech
  hoverIndex.value = index
  toggleCopyIcon.value = true
}

const copyDefinitionToClipBoard = async (definition) => {
  await navigator.clipboard.writeText(definition)
  copiedText.value = true

  setTimeout(() => {
    copiedText.value = false
  }, 1000);
}
</script>