<template>
    <div>
        <button @click="activate(name)" class="bg-[#dcefef] text-[#5ba4a4] hover:bg-[#5ba4a4] hover:text-white active:scale-[98%] rounded-2xl p-2 px-5  transition all ease-linear">
            {{ name }}
        </button>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const active = ref(false)
const emits = defineEmits(['partOfSpeechName'])
const props = defineProps({
    name: String,
})

const activate = (e) => {
    active.value = true
    emits('partOfSpeechName', e)
}
</script>