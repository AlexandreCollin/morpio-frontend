<script setup lang="ts">
    const navigateToGame = () => window.location.hash = "#/game";


</script>

<template>
    <h1>Morpio home page</h1>
    
    <button @click="navigateToGame">Start game</button>
</template>