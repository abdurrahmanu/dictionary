<template>
  <div class="overflow-hidden bg-blue-500 min-h-screen">
    <div class="h-[50px] w-full"></div>
    
    <navBar />
    <customForm @get_data="get_data" @value="searched_word = $event" :result="data"/>
    <messageBox v-if="!is_found" :message="message" @focus_input="focus_input"/>

    <div class="box-border p-5 pb-10 md:py-0 md:px-0 min-h-[calc(100vh-100px)] md:flex" v-else>

      <div class="md:w-[40%] grid items-center">
        <searchedWord @play_audio="play_audio" :data="data" :audio_present="audio_present" />
      </div>

      <div 
      class="grid gap-5 md:w-[60%] h-fit 
      md:h-[calc(100vh-50px)] rounded-sm bg-blue-300 p-5 md:overflow-y-scroll shadow-sm shadow-gray-700">
        <h1 class="text-3xl w-fit m-auto font-black font-mono text-blue-600 text-center underline">DEFINITIONS</h1>
        <partOfSpeech :part_of_speech="data" :key="i" v-for="(data, i) of data.meanings"/>
      </div>

    </div>

  </div>
</template>

<script>
import searchedWord from '../components/searchedWord.vue'
import customForm from '../components/customForm.vue'
import navBar from '@/components/navBar.vue';
import messageBox from '../components/messageBox.vue'
import partOfSpeech from '../components/partOfSpeech.vue'

export default {
  components: {
    searchedWord,
    partOfSpeech,
    messageBox,
    navBar,
    customForm,
  },

  data() {
    return {
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