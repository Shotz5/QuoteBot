<template>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <Box>
            <template #header>
                <p class="m-auto">{{ quote.quote }}</p>
            </template>
        </Box>
        <Box>
            <div class="grid grid-cols-6 break-words">
                <div class="col-span-1">
                    <p class="text-gray-400">Posted: </p>
                </div>
                <div class="col-span-5">
                    <p class="font-bold">{{ quote.posted }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Created: </p>
                </div>
                <div class="col-span-5">
                    <p class="font-bold">{{ formatDate(quote.created_at) }}</p>
                </div>

                <div class="col-span-1">
                    <p class="text-gray-400">Updated: </p>
                </div>
                <div class="col-span-5">
                    <p class="font-bold">{{ formatDate(quote.updated_at) }}</p>
                </div>

                <div class="grid grid-cols-6 col-span-6 p-4">
                    <form v-if="quote.posted == 1" class="grid grid-cols-3 col-span-3" @submit.prevent="unpostQuote">
                        <button  class="col-span-3">
                            Unpost
                        </button>
                    </form>
                    <button v-else class="col-span-3 disabled text-gray-500">
                        Unpost
                    </button>
                    <button class="col-span-3" @click="delQuote">
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
        quote: Object,
    });

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"numeric" });
    }

    const toggleForm = useForm({
        posted: props.quote.posted,
    });

    const unpostQuote = () => {
        toggleForm.posted = 1;
        toggleForm.patch(route('quote.update', props.quote.id))
    }

    const delQuote = () => router.delete(route('quote.destroy', props.quote.id));
</script>