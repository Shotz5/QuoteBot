<template>
    <div class="flex justify-center">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-900 dark:border-gray-700 break-words">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Forgot your password
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="create">
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">
                            Reset Token
                        </label>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">
                            {{ token }}
                        </label>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">
                            Email
                        </label>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">
                            {{ email }}
                        </label>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="password">
                            Password
                        </label>
                        <input v-model="form.password" id="password" placeholder="••••••••" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <label v-if="form.errors.password" class="text-sm text-red-500">
                        {{  form.errors.password }}
                    </label>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="password_confirmation">
                            Confirm Password
                        </label>
                        <input v-model="form.password_confirmation" id="password_confirmation" placeholder="••••••••" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <label v-if="form.errors.password_confirmation" class="text-sm text-red-500">
                        {{ form.errors.password_confirmation }}
                    </label>
                    <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Set password
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useForm } from '@inertiajs/vue3';

    const props = defineProps({
        token: String,
        email: String,
    });

    const form = useForm({
        token: props.token,
        email: props.email,
        password: null,
        password_confirmation: null,
    });
    const create = () => form.post(route('password.update'), form);

</script>