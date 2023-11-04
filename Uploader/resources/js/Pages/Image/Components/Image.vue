<template>
    <Box>
        <template #header>
            <p>{{ image.name }}</p>
        </template>
        <a :href="route('image.show', { image: image.id })">
            <div class="text-center break-words">
                <img :src="'/storage/images/' + image.name" class="h-96 w-full object-scale-down" />
            </div>
        </a>
    </Box>
</template>

<script setup>
    import Box from '@/Components/UI/Box.vue';

    const props = defineProps({
        image: Object
    });
</script>