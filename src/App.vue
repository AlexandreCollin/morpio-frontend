<script setup lang="ts">
  import { ref, computed } from "vue";
  import Home from "./routes/Home.vue";
  import Game from "./routes/Game.vue";

  const routes: { [key: string]: unknown } = {
    "/": Home,
    "/game": Game,
  };

  const currentRoute = ref(window.location.hash);

  window.addEventListener("hashchange", () => {
    currentRoute.value = window.location.hash;
  });

  const currentView = computed(() => {
    const path = currentRoute.value.slice(1).split('?')[0] || "/";
    return routes[path] || "NotFound";
  });
</script>

<template>
  <component :is="currentView" />
</template>