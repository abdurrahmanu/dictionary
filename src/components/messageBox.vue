<template>
    <div class="md:absolute top-44 md:w-[40%]">
        <transition appear name="fade">
            <p class="text-[#357883] text-xl mt-20 uppercase text-center font-black">{{ message }}</p>
        </transition>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props =  defineProps({
        message: String
})
</script>

<style scoped>
.fade-enter-from {
    opacity: 0
}
.fade-enter-active {
    transition: all 1s ease;
}
</style>