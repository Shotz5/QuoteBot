<template>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Quote v-for="quote in quotes" :key="quote.id" :quote="quote" />
    </div>
</template>

<script setup>
    import Quote from '@/Pages/Quote/Components/Quote.vue'
    defineProps({
        quotes: Array,
    })
</script>