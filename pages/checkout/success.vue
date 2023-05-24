<script setup lang="ts">
const cartStore = useCartStore();
watch(
  () => cartStore.status,
  () => {
    if (cartStore.status === "loaded") {
      cartStore.items = [];
    }
  }
);
</script>
<template>
  <div class="mt-10 max-w-6xl mx-auto p-5">
    <h1 class="text-3xl">Thank you for your purchase!</h1>
  </div>
</template>
