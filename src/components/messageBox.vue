<template>
    <div>
        <transition appear name="fade">
            <p class="text-[#357883] text-xl mt-20 uppercase text-center font-black" @click="$emit('focus_input')">{{ message }}</p>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        message: String
    }

}
</script>

<style scoped>
.fade-enter-from {
    opacity: 0
}
.fade-enter-active {
    transition: all 1s ease;
}
</style>