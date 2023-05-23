<template>
  <div class="flex">
    <span>{{ rating }} Stars</span>
    <input
      class="mx-2"
      type="range"
      min="0"
      disabled
      :max="allRatingCount"
      :value="ratingGroupCount"
    />
    <ProductReviewCount :value="ratingGroupCount" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  rating: number;
  ratingGroupCount: number;
  allRatingCount: number;
}>();
const { rating, ratingGroupCount, allRatingCount } = toRefs(props);
</script>

<style scoped></style>
