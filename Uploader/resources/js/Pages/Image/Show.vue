<template>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <Box>
            <div class="break-words">
                <img class="m-auto" :src="'/storage/images/' + image.name" />
            </div>
        </Box>
        <Box>
            <div class="grid grid-cols-5 break-words">
                <div class="col-span-1">
                    <p class="text-gray-400">Title: </p>
                </div>
                <div class="col-span-4">
                    <p class="font-bold">{{ image.name }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Posted: </p>
                </div>
                <div class="col-span-4">
                    <p class="font-bold">{{ image.posted }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Created: </p>
                </div>
                <div class="col-span-4">
                    <p class="font-bold">{{ formatDate(image.created_at) }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Updated: </p>
                </div>
                <div class="col-span-4">
                    <p class="font-bold">{{ formatDate(image.updated_at) }}</p>
                </div>
            </div>
        </Box>
    </div>
</template>

<script setup>
    import Box from '@/Components/UI/Box.vue'

    const props = defineProps({
        image: Object,
    })

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric" });
    }
</script>