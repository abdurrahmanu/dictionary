<template>
    <p class="rounded-lg uppercase text-center w-[75%] m-auto p-7 mt-10 max-w-[450px] py-10 transition-all">
        <span v-if="data">
            <p v-if="data.message">{{ data.message }}</p>
            <p v-if="data.error" class="text-red-500 text-lg">{{ data.error === 'Failed to fetch' ? 'no connection' : error }}</p>
        </span>
        <p class="text-white" v-else>MAKE YOUR SEARCH</p>
    </p>
</template>

<script setup>
const props =  defineProps({
    data: Object,
})
</script>





