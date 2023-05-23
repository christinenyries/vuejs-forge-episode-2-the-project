<template>
  <div>
    <FormKit
      id="product-review-form"
      type="form"
      :config="{ validationVisibility: 'submit' }"
      @submit="submit"
      :actions="false"
      v-model="form"
    >
      <FormKit type="text" label="Title" name="title" validation="required" />
      <FormKit type="textarea" label="Text" name="text" validation="required" />
      <FormKit
        type="radio"
        label="Rating"
        name="rating"
        :options="{
          1: '⭐',
          2: '⭐⭐',
          3: '⭐⭐⭐',
          4: '⭐⭐⭐⭐',
          5: '⭐⭐⭐⭐⭐',
        }"
        validation="required"
      />

      <AppButton class="btn-primary" :loading="loading">Submit</AppButton>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { reset } from "@formkit/vue";
defineProps<{ loading?: boolean }>();
const emits = defineEmits<{ (event: "submit", data: any): void }>();
const form = reactive({
  title: "",
  text: "",
  rating: 0,
});
function submit(data: any) {
  emits("submit", data);
  reset("product-review-form");
}
</script>

<style scoped></style>
