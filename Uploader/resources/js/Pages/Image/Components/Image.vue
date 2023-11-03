<template>
    <Box>
        <a :href="route('image.show', { image: image.id })">
            <div class="text-center break-words">
                <img :src="'/storage/images/' + image.name" />
                <p>{{ image.name }}</p>
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