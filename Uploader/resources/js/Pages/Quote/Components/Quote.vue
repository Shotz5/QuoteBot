<template>
    <Box>
        <template #header>
            <a :href="route('quote.show', { quote: quote.id })">
                <p>{{ quote.quote }}</p>
            </a>
        </template>
        
    </Box>
</template>

<script setup>
    import Box from '@/Components/UI/Box.vue';

    const props = defineProps({
        quote: Object
    });
</script>