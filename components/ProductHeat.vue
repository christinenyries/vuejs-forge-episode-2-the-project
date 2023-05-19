<script setup>
defineProps({
  heatLevel: String,
});
const heatMap = {
  Original: "🍞",
  Vegan: "🍀",
  Keto: "🍖",
};
</script>
<template>
  <span>
    {{ heatLevel ? heatMap[heatLevel] : "" }}
  </span>
</template>
