import { ref } from "vue";

export function wordInLocalStorage(word) {
    const exists = ref(false)
    const previousSearchWords = ref([])
    const wordData = ref({})
    const allPrevious = JSON.parse(localStorage.getItem('dictionaryHistoryArray'));

    if (Array.isArray(allPrevious)) {
        previousSearchWords.value = allPrevious.map(data => {
            return data.word;
        })
    
        exists.value = previousSearchWords.value.includes(word.value)
    
        if (exists.value) {
            wordData.value = Array.from(allPrevious).filter(entry => {
                return entry.word === word.value
            })
        }
    }
    
    return { exists, wordData}
}


























