<script setup>
const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
});
const pricePretty = computed(() => {
  return !props.price ? "Php0.00" : `Php${(props.price / 100).toFixed(2)}`;
});
</script>
<template>
  <span>{{ pricePretty }}</span>
</template>
