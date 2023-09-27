<template>
    <div>
        <div class="w-[90%] m-auto">
            <div class="w-full bg-white h-fit py-4">
                <div class="w-full h-fit p-3" v-for="i in 2" :key="i">
                    <p class="ml-1 w-10 bg-gray-300 h-3"></p>
                    <div class="bg-gray-200 h-5 m-1 w-full"></div>
                    <div class="bg-gray-200 h-5 m-1 w-[70%]"></div>
                    <div class="bg-gray-200 h-5 m-1 w-[50%]"></div>
                    <div class="bg-gray-200 h-5 m-1 w-[90%]"></div>
                    <div class="m-auto mt-3 w-[40%] h-12 bg-gray-200"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>