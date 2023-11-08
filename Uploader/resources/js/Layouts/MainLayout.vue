<template>
    <header class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full">
        <div class="container mx-auto">
            <nav class="p-4 grid grid-cols-3 justify-between">
                <div class="text-lg font-medium text-left">
                    <Link :href="route('image.create')">Upload Image</Link>&nbsp;| 
                    <Link :href="route('quote.create')">Upload Quote</Link>
                </div>
                <div class="text-lg font-medium text-center">
                    <Link :href="route('image.index')" class="text-xl text-gray-50 dark:text-gray-50 font-bold text-center">Images</Link>&nbsp;| 
                    <Link :href="route('quote.index')" class="text-xl text-gray-50 dark:text-gray-50 font-bold text-center">Quotes</Link>
                </div>
                <div class="text-lg font-medium text-right">
                    <span v-if="user">Welcome {{ user.name }}! <Link :href="route('logout')">Logout</Link></span>
                    <Link v-else :href="route('login')">Login</Link>
                </div>
            </nav>
        </div>
    </header>

    <main class="container mx-auto p-4">
        <div v-if="flashSuccess" class="mb-4 border rounded-md shadow-sm border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900 text-gray-50 p-2">
            {{ flashSuccess }}
        </div>
        <slot>Default</slot>
    </main>
    
</template>

<script setup>
    import { usePage, Link } from '@inertiajs/vue3'
    import { computed } from 'vue';

    const flashSuccess = computed(() => usePage().props.flash.success);
    const user = computed(() => usePage().props.user);
</script>