<template>
    <!-- :class="[Object.keys(result).length ? 'md:w-[40%] bg-green-400' : 'md:w-full']" -->
    <div class="fixed top-20">
        <form @submit.prevent="$emit('get_data')" class="flex fixed w-full">
            <input
            class="bg-transparent h-10 m-auto rounded-full w-[80%] bg-white font-mono p-2 px-5 outline-none shadow-sm shadow-blue-300"
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
