<template>
  <div class="card card-bordered border-red-200 border-2 w-max">
    <div class="card-body text-sm">
      <p>
        <span class="text-3xl">{{ averageRating }}</span>
        <span> out of </span>
        <span class="text-3xl">5</span>
      </p>
      <ProductReviewCount :value="count" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ averageRating: number; count: number }>();
</script>
