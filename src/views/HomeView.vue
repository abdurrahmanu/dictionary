<template>
  <div class="overflow-hidden bg-orange-200 min-h-screen pb-4 pt-32">
    <navBar />
    <customForm
      @get_data="get_data"
      @value="searched_word = $event"
      :result="data"
    />

      <searchedWord
      v-if="is_found"
      @play_audio="play_audio"
      :data="data"
      :audio_present="audio_present"
      />

    <div class="flex fixed top-48 w-full gap-4 overflow-scroll scrollbar-hide scroll-smooth p-4 justify-center" v-if="is_found">
      <partOfSpeechBtn v-for="(data, index) in partsOfSpeech" :partOfSpeech="data" :key="index" @partOfSpeechName="check($event)"/>
    </div>

      <div class="overflow-y-scroll h-[calc(100vh/1.9)] fixed w-[90%] left-[50%] -translate-x-[50%] m-auto top-[280px] rounded-lg scrollbar scrollbar-track-orange-300 scrollbar-thumb-blue-200 hover:scrollbar-thumb-blue-300 scrollbar-w-[1px]" v-if="answer">
        <active_part_of_speech :partOfSpeech="partOfSpeech" />
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
      clicked: "",
    };
  },

  methods: {
    check (e) {
      if (e) {
        this.answer = true
        this.partOfSpeech = this.data.meanings.filter(partOfSpeech => partOfSpeech.partOfSpeech == e)[0]
        console.log(this.partOfSpeech);
      }
    },
    async get_data() {
      if (this.searched_word.length < 1) {
        this.message = "";
        setTimeout(() => {
          this.message = "make your search";
        }, 100);
      } else {
        try {
          const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${this.searched_word}`
          );
          const data = await res.json();
          this.partsOfSpeech = data[0].meanings.map(each => each.partOfSpeech)

          if (res.status === 200) {
            this.is_found = true;
            this.data = data[0];
            this.searched_word = "";
            for (let i = 0; i < this.data.phonetics.length; i++) {
              if (this.data.phonetics[i].audio) {
                this.audio = this.data.phonetics[i].audio;
                this.audio_present = true;
                break;
              } else {
                console.log("No audio file");
                this.audio_present = false;
              }
            }
          } else {
            this.message = "";
            setTimeout(() => {
              this.message = "Word not found, Try another word";
            }, 100);
            this.is_found = false;
          }
        } catch (error) {
          this.message = "";
          setTimeout(() => {
            this.message = error.message;
          }, 100);
        }
      }
    },
    play_audio() {
      this.$refs.audio.play();
    },
    focus_input() {
      const search_box = this.$refs.search;
      search_box.focus();
    },
  },
};
</script>
