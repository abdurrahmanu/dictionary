<template>
    <div>
        <div 
        class="bg-teal-300 m-auto mt-10 transition-all ease-linear p-5 rounded-3xl text-center text-white text-2xl font-black uppercase w-fit" @click="$emit('focus_input')">
            <transition appear name="fade">
                <p>{{ message }}</p>
            </transition>
        </div>
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