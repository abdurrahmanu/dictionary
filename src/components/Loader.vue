<template>
    <div>
        <div class="md:flex">
            <div class="px-5 md:w-[30%] md:px-2 p-1 md:mx-auto space-y-1 w-[100%] max-w-[200px] m-1">
                <div class="h-[30px] bg-neutral-700"></div>            
                <div class="h-[30px] bg-neutral-700"></div>            
            </div>
            <div class="w-[90%] md:w-[70%] m-auto pt-4 md:min-h-[calc(100dvh_-_48px)] bg-neutral-[900] md:shadow md:shadow-black">
                <div class="w-full h-fit py-4 shadow-black">
                    <div class="w-full h-fit p-3 space-y-1" v-for="i in 2" :key="i">
                        <p class="ml-1 w-10 bg-gray-300 h-5"></p>
                        <div class="bg-neutral-700 h-5 w-full"></div>
                        <div class="bg-neutral-700 h-5 w-[70%]"></div>
                        <div class="bg-neutral-700 h-5 w-[50%]"></div>
                        <div class="bg-neutral-700 h-5 w-[90%]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>