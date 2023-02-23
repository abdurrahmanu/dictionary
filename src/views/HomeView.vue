<template>
  <div class="overflow-x-hidden bg-[#effafa] min-h-screen pb-4 md:pb-0">
    <div class="h-[100px] w-full bg-[#effafa]"></div>
    <navBar class="" />
    <customForm
      @get_data="get_data"
      @value="searched_word = $event"
      :result="data"
    />

    <div class="md:flex md:h-[calc(100vh-100px)] pt-10 md:pt-0 m-auto">
      <div class="md:pt-20 md:w-[40%]">
        <div v-if="data_loading" class="w-10 h-10 rounded-xl bg-gradient-tr from-gray-600 via-gray-600 to-transparent">
        </div>
          <div v-if="is_found & !data_loading">
            <searchedWord
            :data="data"
            :audio_present="audio_present"
            />
            <div class="flex md:grid w-full py-10 gap-3 px-5 flex-wrap justify-center">
              <partOfSpeechBtn v-for="(name, index) in partsOfSpeech" 
              :name="name" :key="index" @partOfSpeechName="check($event)"/>
            </div>
          </div>
      </div>
  
      <div class="md:w-[60%] md:border-l md:border-[#275b5b] align-middle md:pt-20">
          <active_part_of_speech v-if="answer" :partOfSpeech="partOfSpeech" />
      </div>

    </div>

    <messageBox
      v-if="!is_found && !data_loading"
      :message="message"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import active_part_of_speech from "@/components/active_part_of_speech.vue";
import searchedWord from "../components/searchedWord.vue";
import partOfSpeechBtn from "@/components/partOfSpeechBtn.vue";
import customForm from "../components/customForm.vue";
import navBar from "@/components/navBar.vue";
import messageBox from "../components/messageBox.vue";
import gsap from 'gsap'

const answer = ref( false)
const partsOfSpeech = ref([])
const partOfSpeech = ref( [])
const is_found = ref( false)
const data = ref( [])
const searched_word = ref( "")
const message = ref( "make your search")
const audio = ref( "")
const audio_present = ref(false)
const data_loading = ref(false)

function check (e) {
  if (e) {
    answer.value = true
    partOfSpeech.value = data.value.meanings.filter(partOfSpeech => partOfSpeech.partOfSpeech == e)[0]
  }
}

async function get_data() {
  partOfSpeech.value = []
  answer.value = false
  is_found.value = false
  if (searched_word.value.length < 1) message.value = "make your search";
  else {
    try {
      data_loading.value = true
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searched_word.value}`);
      const word_definitions = await res.json();      
      if (res.status === 200) {
        data.value = word_definitions[0];
        data_loading.value = false;
        partsOfSpeech.value = data.value.meanings.map(each => each.partOfSpeech);
        is_found.value = true;
        searched_word.value = "";
        for (let i = 0; i < data.value.phonetics.length; i++) {
          if (data.value.phonetics[i].audio) {
            audio.value = data.value.phonetics[i].audio;
            audio_present.value = true;
            break;
          } else audio_present.value = false;
        }
      } else {
        data_loading.value = false
        message.value = "Word not found, Try another word";
      }
    } catch (error) {
        data_loading.value = false
        message.value = error.message;
    }
  }
}

</script>
