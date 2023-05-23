<template>
  <div
    class="card card-bordered my-5 bg-base-100 rounded-md shadow-xl"
    :key="props.id"
  >
    <div class="card-body">
      <p>{{ "⭐".repeat(props.rating) }}</p>
      <h4 class="text-xl font-bold">{{ props.title }}</h4>
      <p class="opacity-50">{{ timeSinceCreated }}</p>
      <p>{{ props.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";

const props = defineProps<{
  id: string;
  rating: number;
  title: string;
  text: string;
  createdAt: string;
}>();
const timeSinceCreated = useTimeAgo(() => props.createdAt);
</script>
