<template>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <Box>
            <template #header>
                {{ image.name }}
            </template>
            <div class="break-words">
                <img class="m-auto" :src="'/storage/images/' + image.name" />
            </div>
        </Box>
        <Box>
            <div class="grid grid-cols-6 break-words">
                <div class="col-span-1">
                    <p class="text-gray-400">Title: </p>
                </div>
                <div class="col-span-5">
                    <p class="font-bold">{{ image.name }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Posted: </p>
                </div>
                <div class="col-span-5">
                    <p class="font-bold">{{ image.posted }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Created: </p>
                </div>
                <div class="col-span-5">
                    <p class="font-bold">{{ formatDate(image.created_at) }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Updated: </p>
                </div>
                <div class="col-span-5">
                    <p class="font-bold">{{ formatDate(image.updated_at) }}</p>
                </div>

                <div class="grid grid-cols-6 col-span-6 p-4">
                    <form v-if="image.posted == 1" class="grid grid-cols-3 col-span-3" @submit.prevent="unpostImage">
                        <button  class="col-span-3">
                            Unpost
                        </button>
                    </form>
                    <button v-else class="col-span-3 disabled text-gray-500">
                        Unpost
                    </button>
                    <button class="col-span-3" @click="delImage">
                        Delete
                    </button>
                </div>
            </div>
        </Box>
    </div>
</template>

<script setup>
    import { router, useForm } from '@inertiajs/vue3';
    import Box from '@/Components/UI/Box.vue'

    const props = defineProps({
        image: Object,
    });

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric" });
    }

    const toggleForm = useForm({
        posted: props.image.posted,
    });

    const unpostImage = () => {
        toggleForm.posted = 0;
        toggleForm.patch(route('image.update', props.image.id))
    }

    const delImage = () => router.delete(route('image.destroy', props.image.id));
</script>