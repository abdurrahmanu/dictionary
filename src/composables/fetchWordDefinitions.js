import { ref } from 'vue'

export async function fetchWordDefinitions(url) {
    const data = ref({
        wordData: '',
        message: '',
        error: ''
    })

    try {
        const res = await fetch(url);
        const word_definitions = await res.json();
        if (res.status === 200) {
            data.value.wordData = word_definitions[0]
        }
        else {
            data.value.message = 'not found'
        }
    } catch (error) {
        data.value.error = error.message
    }

    return { data }
}



