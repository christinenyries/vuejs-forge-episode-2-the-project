<template>
  <p>({{ value }} {{ value > 1 ? "reviews" : "review" }})</p>
</template>

<script setup lang="ts">
defineProps<{ value: number }>();
</script>
