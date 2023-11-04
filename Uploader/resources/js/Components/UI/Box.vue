<template>
    <div class="border border-gray-200 dark:border-gray-800 rounded-md p-4 shadow-sm dark:text-gray-300 justify-center">
        <div class="text-gray-400 font-medium mb-2 text-center break-words">
            <slot name="header"></slot>
        </div>
        <slot></slot>
    </div>
</template>