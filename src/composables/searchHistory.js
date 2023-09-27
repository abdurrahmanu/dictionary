import { ref } from "vue";

export function searchHistory() {
    const showPreviousSearch = ref(false)
    const previousSearchWords = ref([])
    const allPrevious = JSON.parse(localStorage.getItem('dictionaryHistoryArray'));

    if (allPrevious) {
        previousSearchWords.value = allPrevious.map(data => {
            return data.word;
        });

        if (previousSearchWords.value.length) {
            showPreviousSearch.value = true;
        } else {
            showPreviousSearch.value = true;
            previousSearchWords.value.push('No History');

            setTimeout(() => {
                showPreviousSearch.value = false;
                previousSearchWords.value = [];
            }, 3000);
        }
    } else {
        showPreviousSearch.value = false
        previousSearchWords.value = []
    }

    return {showPreviousSearch, previousSearchWords}
}