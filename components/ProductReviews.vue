<script setup lang="ts">
const props = defineProps<{ productId: string }>();

const deskree = useDeskree();
const reviewsStore = useReviewsStore();

const showReviewForm = ref(false);
const showReviews = ref(true);

const loggedInUser = computed(() => deskree.loggedInUser.value);

async function addReview(data: any) {
  await reviewsStore.addReview({ ...data, product_id: props.productId });
  showReviewForm.value = false;
  await reviewsStore.fetchReviews(props.productId);
}

onMounted(async () => {
  reviewsStore.fetchReviews(props.productId);
});
</script>
<template>
  <div>
    <hr class="my-10" />
    <h3 class="text-xl">Product Rating and Reviews</h3>
    <div class="mt-2 mb-16">
      <AppSpinner
        v-if="reviewsStore.isFetchingReviews || !reviewsStore.reviews"
      />
      <div v-else>
        <!-- Rating Summary  -->
        <div class="flex gap-6">
          <!-- Rating Average -->
          <ProductReviewRatingAverageCard
            :average-rating="reviewsStore.averageRating"
            :count="reviewsStore.count"
          />
          <!-- Number of Reviews by Rating -->
          <div>
            <ProductReviewRatingGroup
              v-for="rating in 5"
              :key="rating"
              :rating="rating"
              :rating-group-count="
                reviewsStore.reviewsByRating[rating]?.length || 0
              "
              :all-rating-count="reviewsStore.count"
            />
          </div>
        </div>

        <!-- Actions -->
        <div class="my-6">
          <!-- Write Review -->
          <button
            v-if="loggedInUser"
            class="underline"
            @click="showReviewForm = !showReviewForm"
          >
            {{ showReviewForm ? "Hide Form" : "Write a Review" }}
          </button>
          <NuxtLink v-else to="/login" class="underline"
            >Log in to Write a Review</NuxtLink
          >

          <span class="mx-2">|</span>

          <!-- Hide/Show Reviews -->
          <button class="underline" @click="showReviews = !showReviews">
            {{ showReviews ? "Hide" : "Show" }} All Reviews
          </button>
        </div>

        <!-- Review Form -->
        <ProductReviewForm
          class="mb-6"
          v-show="showReviewForm"
          :loading="reviewsStore.isAddingReview"
          @submit="addReview"
        />

        <!-- All Reviews -->
        <div v-show="showReviews">
          <div v-if="!reviewsStore.isEmpty">
            <ProductReviewCard
              v-for="review in reviewsStore.reviews"
              :id="review.uid"
              :rating="review.attributes.rating"
              :created-at="review.attributes.createdAt"
              :title="review.attributes.title"
              :text="review.attributes.text"
            />
          </div>
          <p v-else class="opacity-50">No reviews.</p>
        </div>
      </div>
    </div>
  </div>
</template>
