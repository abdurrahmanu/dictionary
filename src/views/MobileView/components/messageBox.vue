<template>
    <Transition name="fade" appear>
        <div class="py-10 mt-20" v-if="!input">
            <div>
                <p
                class="bg-white font-thin shadow-md shadow-gray-300 hover:shadow-sm rounded-lg uppercase text-center w-[75%] m-auto p-7 max-w-[250px]">{{message ? message : 'make your search'}}</p>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { defineProps, watchEffect, ref, } from 'vue';

const message = ref('')
const input = ref('')

const props =  defineProps({
    inputEvent: String,
    word: String,
    wordData: Object,
})

watchEffect(() => {

    if (props.wordData.data) {
        if (props.wordData.data.message) {
            message.value = props.word + ' ' + props.wordData.data.message
        }
    }

    if (props.wordData.data) {
        if (props.wordData.data.error) {
            if (props.wordData.data.error === 'Failed to fetch') {
                message.value = 'no connection'
            }
            else message.value = props.wordData.data.error
            
        }
    }

})

</script>

<style scoped>
.fade-enter-from {
    opacity: 0
}

.fade-enter-to {
    opacity: 1
}

.fade-enter-active {
    transition: all 1s ease;
}

.fade-leave-t0 {
    opacity: 0;
}

.fade-leave-active {
    transition: all 0s ease;
}
</style>





