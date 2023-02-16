<template>
    <div>
        <div 
        :class="[message.includes('failed') ? 'bg-red-500' : '']"
        class="bg-blue-400 mt-20 m-auto min-w-[350px] w-[400px] p-10 py-10 rounded-3xl text-center text-white text-2xl font-black uppercase" @click="$emit('focus_input')">
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