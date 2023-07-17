import { ref } from "vue";

export function formatWordData(wordData) {
    const partsOfSpeech = ref([]);
    const phonetics = ref('')
    const data = ref([]);
    const audio = ref("");
    const audio_present = ref(false);
    const sourceUrl = ref('')
    const word = ref('')

    partsOfSpeech.value = wordData.wordData.meanings.map(each => each);
    phonetics.value = wordData.wordData.phonetics
    sourceUrl.value = wordData.wordData.sourceUrls[0]
    word.value = wordData.wordData.word
    
    for (let i = 0; i < wordData.wordData.phonetics.length; i++) {
        if (wordData.wordData.phonetics[i].audio) {
            audio.value = wordData.wordData.phonetics[i].audio;
            audio_present.value = true;
            break;
        } else audio_present.value = false;
    }

    return {
        sourceUrl,
        word,
        partsOfSpeech,
        phonetics,
        data,
        audio,
        audio_present,
    };
}