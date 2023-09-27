<template>
    <div  class="pt-5">
        <div class="w-[90%] m-auto pt-5 pl-20">
            <div class="bg-gray-200 h-6 w-[70%] mb-1"></div>
            <div class="bg-gray-200 h-6 w-[75%] mb-1"></div>
            <div class="bg-gray-200 h-6 w-[70%] mb-1"></div>
        </div>
        <div class="w-[90%] m-auto pt-10">
            <div class="bg-gray-200 h-3 w-[20%] m-auto mb-1"></div>
            <div v-for="i in 3" :key="i" class="bg-gray-200 h-5 w-[40%] m-auto mb-1"></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>