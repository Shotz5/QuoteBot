<template>
    <div class="flex justify-center">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Forgot your password
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="create">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">
                            Your email
                        </label>
                        <input v-model="form.email" id="email" placeholder="name@example.com" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <label v-if="form.errors.status" class="text-sm text-red-500">
                        {{  form.errors.status }}
                    </label>
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Reset password
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';

    const form = useForm({
        email: null,
    });
    const create = () => form.post(route('password.email'), form);

</script>