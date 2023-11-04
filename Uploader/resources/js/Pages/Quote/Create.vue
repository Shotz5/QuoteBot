<template>
    <div class="text-center justify-center m-5">
        <form v-on:submit.prevent="submit">
            <div>
                <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="form.quote" name="quote" maxlength="2048" />
            </div>
            <button class="m-4">Submit</button>
            <div v-if="form.errors" v-for="errors in form.errors" class="input-error">
                {{ errors }}
            </div>
        </form>
    </div>
</template>

<script setup>
    import { useForm } from '@inertiajs/vue3'

    const form = useForm({
        quote: null,
    });

    const submit = () => form.post(route('quote.store'));
</script>