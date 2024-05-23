<template>
    <Transition name="fade" appear>
        <div class="py-10 mt-20" v-if="!input">
            <div>
            <p
                class="bg-white  rounded-lg uppercase text-center w-[75%] m-auto p-7 py-12 max-w-[450px]">
                <div v-if="wordData.data">
                    <span v-if="wordData.data.message" class="font-bold">{{ wordData.data.message ? word + ' ' + wordData.data.message : '' }}</span>
                    <span v-if="wordData.data.error" class="text-red-500 font-bold text-lg">{{ wordData.data.error === 'Failed to fetch' ? 'no connection' : wordData.data.error }}</span>
                </div>
                <span v-else>MAKE YOUR SEARCH</span>
            </p>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { watchEffect, ref, } from 'vue';

const message = ref('')
const input = ref('')

const props =  defineProps({
    inputEvent: String,
    word: String,
    wordData: Object,
})

watchEffect(() => {

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





