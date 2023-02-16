<template>
  <transition name="full">
      <div
        :class="[!open ? 'border-2' : 'border']"
        class="rounded-lg border-white bg-gray-200"
      >
        <div
            :class="[!open ? 'rounded-lg' : 'rounded-t-lg']"
            class="flex justify-between items-center p-4 text-xl text-white bg-blue-800 uppercase"
        >
          <h2>
            {{ part_of_speech.partOfSpeech }}
          </h2>
          <arrow_down @click="toggle_box" />
        </div>

        <div class="p-4 pl-5" v-if="open">
            <transition appear name="collapse">
                <div>
                    <ul :key="def" v-for="def of part_of_speech.definitions">
                      <li
                        class="list-disc list-inside font-mono text-lg p-1 font-bold text-gray-800"
                      >
                        {{ def.definition }}
                      </li>
                    </ul>
          
                    <div class="font-mono text-lg grid gap-2 mt-5">
                      <div
                        class="flex flex-wrap items-center"
                        v-if="part_of_speech.antonyms.length"
                      >
                        <p class="text-2xl">ANTONYMS:</p>
                        <ul class="flex gap-1 flex-wrap">
                          <li v-for="ant of part_of_speech.antonyms" :key="ant" class="text-lg">
                            {{ ant
                            }}{{
                              part_of_speech.antonyms[part_of_speech.antonyms.length - 1] === ant ? "." : ", "
                            }}
                          </li>
                        </ul>
                      </div>
          
                      <div
                        class="flex flex-wrap items-center"
                        v-if="part_of_speech.synonyms.length"
                      >
                        <p class="text-2xl">SYNONYMS:</p>
                        <ul class="flex gap-1 flex-wrap">
                          <li :key="syn" v-for="syn of part_of_speech.synonyms" class="text-lg">
                            {{ syn
                            }}{{
                              part_of_speech.synonyms[part_of_speech.synonyms.length - 1] === syn ? "." : ","
                            }}
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
            </transition>
        </div>

      </div>
  </transition>
</template>

<script>
import arrow_down from '@/assets/svg/arrow_down.vue';

export default {
    components: {
        arrow_down
    },
    data() {
        return {
            open: true
        }
    },
    props: {
        part_of_speech: Object,
    },
    methods: {
        toggle_box() {
           this.open = !this.open
        }
    }
};

</script>

<style scoped>
.collapse-enter-from,
.collapse-leave-from {
    height: 0;
    opacity: 0;
}

.collapse-enter-active,
.collapse-leave-active {
    transition: all 2s ease;
}

</style>