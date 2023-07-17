<template>
    <Teleport to="#sideBar">
        <div>            
            <Transition appear>           
                <div @click="closeSidebar" v-if="toggle" class="fixed min-h-screen w-full top-0 left-0 bg-black opacity-40"></div>
            </Transition>
            <Transition appear>
                <div v-if="toggle" :class="class" class="fixed top-0 bg-white min-h-screen min-w-[0px] left-0">
                    <div class="p-3 pt-2 relative grid text-right">
                        <span v-if="showContent" @click="closeSidebar" class="text-2xl">x</span>
                    </div>
                    <div v-if="showContent">
                        <slot/>
                    </div>                       
                </div>
            </Transition>
        </div>
    </Teleport>
</template>

<script setup>
import { defineProps,defineEmits, watchEffect, ref } from 'vue';

const props = defineProps({
    toggle: Boolean,
    class: String,
})

const emit = defineEmits(['false'])
const showContent = ref(false)

const closeSidebar = () => {
    showContent.value = false
    emit('false')
}

watchEffect(() => {
    if (props.toggle) {
        showContent.value = true
    }
})

</script>

<style scoped>
.side-enter-from, 
.side-leave-to {
    width: 0px;
    opacity: 0;
}

.side-enter-active {
    transition: all 4s ease;
    transition-delay: 0.2;
}

.side-leave-active {
    transition: width 2s ease;
}
</style>