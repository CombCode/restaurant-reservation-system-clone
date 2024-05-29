<template>
        <div class="flex flex-col m-6">
            <div class=" my-1 bg-green-600 text-white text-sm hover:bg-green-900 rounded-sm" @click="throwAction">Arrived</div>
            <div class=" my-1 bg-orange-600 text-white text-sm hover:bg-orange-900 rounded-sm" @click="throwAction">No-Show</div>
            <div class=" my-1 bg-blue-600 text-white text-sm hover:bg-blue-900 rounded-sm" @click="throwAction">Edit</div>
            <div class=" my-1 bg-red-600 text-white text-sm hover:bg-red-900 rounded-sm" @click="throwAction">Delete</div>
        </div>
</template>

<script>
    export default {
    methods:{
        throwAction(e){
            let code = e.currentTarget.innerHTML
            console.log(code)
            this.$emit("azioneRichiesta", code)
        }
    }
    }
</script>