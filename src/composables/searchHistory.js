import { ref } from "vue";

export function searchHistory() {
    const showPreviousSearch = ref(false)
    const previousSearchWords = ref([])

    if (!showPreviousSearch.value) {
        const allPrevious = JSON.parse(localStorage.getItem('dictionaryHistoryArray'));
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
        showPreviousSearch.value = false;
    }

    return {showPreviousSearch, previousSearchWords}
}