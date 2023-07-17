import { onMounted, ref, watchEffect } from 'vue';

export function useScreenSize() {
    const isBigScreen = ref(false)
    const smallScreen = 840
    const screen = ref(innerWidth)

    window.addEventListener('resize', () => {
        isBigScreen.value = innerWidth > smallScreen
    })

    onMounted(() => {
        isBigScreen.value = innerWidth > smallScreen
    })

    return {isBigScreen}
}