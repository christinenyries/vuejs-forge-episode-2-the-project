<script setup>
defineProps({
  heatLevel: String,
});
const heatMap = {
  Mild: "🔥",
  Medium: "🔥🔥",
  Hot: "🔥🔥🔥",
};
</script>
<template>
  <span>
    {{ heatLevel ? heatMap[heatLevel] : "" }}
  </span>
</template>
