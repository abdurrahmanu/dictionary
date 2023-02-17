<template>
  <div class="overflow-x-hidden bg-[#effafa] min-h-screen pb-4">
    <div class="h-[100px] w-full bg-[#effafa]"></div>
    <navBar class="" />
    <customForm
      @get_data="get_data"
      @value="searched_word = $event"
      :result="data"
    />

    <div class="bg-red-500 md:flex md:h-[calc(100vh-100px)] pt-10 m-auto">
      <div v-if="is_found" class="pt-10 md:w-[40%] md:bg-green-500">
        <searchedWord
        @play_audio="play_audio"
        :data="data"
        :audio_present="audio_present"
        />
        <div class="flex w-full gap-4 overflow-scroll scrollbar-hide align-middle scroll-smooth p-4">
          <partOfSpeechBtn v-for="(data, index) in partsOfSpeech" :partOfSpeech="data" :key="index" @partOfSpeechName="check($event)"/>
        </div>
      </div>
  
        <div v-if="answer" class="md:w-[60%] align-middle md:bg-yellow-500">
          <active_part_of_speech :partOfSpeech="partOfSpeech" />
        </div>
    </div>

    <messageBox
      v-if="!is_found"
      :message="message"
      @focus_input="focus_input"
    />
  </div>
</template>

<script>
import active_part_of_speech from "@/components/active_part_of_speech.vue";
import searchedWord from "../components/searchedWord.vue";
import partOfSpeechBtn from "@/components/partOfSpeechBtn.vue";
import customForm from "../components/customForm.vue";
import navBar from "@/components/navBar.vue";
import messageBox from "../components/messageBox.vue";
import gsap from 'gsap'

export default {
  components: {
    searchedWord,
    messageBox,
    navBar,
    customForm,
    partOfSpeechBtn,
    active_part_of_speech,
  },

  data() {
    return {
      answer: false,
      partsOfSpeech: [],
      partOfSpeech: [],
      is_found: false,
      data: [],
      searched_word: "",
      message: "make your search",
      audio: "",
      audio_present: false,
      loading: false,
    };
  },

  methods: {
    check (e) {
      if (e) {
        this.answer = true
        this.partOfSpeech = this.data.meanings.filter(partOfSpeech => partOfSpeech.partOfSpeech == e)[0]
      }
    },
    async get_data() {
      this.partOfSpeech = []
      this.answer = false
      this.is_found = false
      if (this.searched_word.length < 1) this.message = "make your search";
      else {
            try {
          const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.searched_word}`);
          const data = await res.json();
          
          if (res.status === 200) {
            this.data = data[0];
            this.partsOfSpeech = this.data.meanings.map(each => each.partOfSpeech)
            this.is_found = true;
            this.searched_word = "";
            for (let i = 0; i < this.data.phonetics.length; i++) {
              if (this.data.phonetics[i].audio) {
                this.audio = this.data.phonetics[i].audio;
                this.audio_present = true;
                break;
              } else this.audio_present = false;
            }
          } else this.message = "Word not found, Try another word";
        } catch (error) {
            this.message = error.message;
        }
      }
    },
    play_audio() {
      this.$refs.audio.play();
    },
  },
};
</script>
