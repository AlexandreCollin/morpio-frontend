<script setup lang="ts">
    import TitleComponent from '@/components/TitleComponent.vue';
    import PlayButtonComponent from '@/components/PlayButtonComponent.vue';

    const navigateToGame = () => window.location.hash = "#/game";


</script>

<template>
    <PlayButtonComponent @click="navigateToGame">Start game</PlayButtonComponent>
    <TitleComponent />
</template>