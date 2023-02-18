<template>
  <div
    class="m-auto w-[90%] bg-[#ffffff] p-2 rounded-lg shadow-sm shadow-[#479292]"
  >
    <h2 class="text-[#479292] text-2xl font-black text-center uppercase">
      {{ partOfSpeech.partOfSpeech }}
    </h2>
    <div class="text-gray-500">
      <div>
        <ul>
          <li
            v-for="definition in partOfSpeech.definitions"
            :key="definition"
            class="list-disc list-inside font-mono p-1 font-bold"
          >
            {{ definition.definition }}
          </li>
        </ul>

        <div class="font-mono grid gap-2 mt-5">
          <div
            class="flex flex-wrap items-center"
            v-if="partOfSpeech.antonyms.length"
          >
            <p class="">ANTONYMS:</p>
            <ul class="flex gap-1 flex-wrap">
              <li
                v-for="antonym of partOfSpeech.antonyms"
                :key="antonym"
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
            class="flex flex-wrap items-center"
            v-if="partOfSpeech.synonyms.length"
          >
            <p class="">SYNONYMS:</p>
            <ul class="flex gap-1 flex-wrap">
              <li
                :key="synonym"
                v-for="synonym of partOfSpeech.synonyms"
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
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from "vue";

const emits = defineEmits(["name"]);
const props = defineProps({
  partOfSpeech: Object,
});
onMounted(() => emits('name', props.partOfSpeech.partOfSpeech))

const active_part_of_speech = ref("");
</script>
