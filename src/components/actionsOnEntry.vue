<template>
        <div class="flex flex-col m-6">
            <div
            class=" my-1 py-1 bg-green-600 text-white text-sm hover:bg-green-900 rounded-sm
            md:py-0"
            @click="throwAction('arrived')"
            >Arrived</div>

            <div
            class=" my-1 py-1 bg-orange-600 text-white text-sm hover:bg-orange-900 rounded-sm
            md:py-0"
            @click="throwAction('noShow')"
            >No-Show</div>

            <div
            class=" my-1 py-1 bg-blue-600 text-white text-sm hover:bg-blue-900 rounded-sm
            md:py-0"
            @click="throwAction('edit')"
            >Edit</div>

            <div
            class=" my-1 py-1 bg-red-600 text-white text-sm hover:bg-red-900 rounded-sm
            md:py-0"
            @click="throwAction('delete')"
            >Delete</div>
        </div>
</template>

<script>

    export default {
        setup(props, { emit }){
            function throwAction(action){
                emit("actionOnReservation", action)
            }

            return{ throwAction }
        }
    }
</script>