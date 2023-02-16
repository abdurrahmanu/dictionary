<template>
    <div 
    :class="[Object.keys(result).length ? 'md:w-[40%] bg-green-400' : 'md:w-full']"
    class="flex md:fixed w-full top-[50px] left-0 justify-center box-border bg-gradient-to-r from-gray-100 via-blue-300 to-blue-900 h-[50px]">
        <form @submit.prevent="$emit('get_data')" class="flex w-full">
            <input
            class="bg-transparent w-full border-b border-white p-2 px-5 font-sans outline-none"
            type="search"
            placeholder="Search"
            ref="search"
            v-model="value"
            @input="$emit('value', value)"
            />
        </form>
    </div>
</template>

<script>
import Search from "../assets/svg/search.vue";

export default {
    data() {
        return {
            value: ''
        }
    },
    props: {
        result: Object,
    },
    components: {
        Search,
    }
};

</script>

<style></style>
