import { Review } from "~/types";

export const useReviewsStore = defineStore("ReviewsStore", () => {
  const deskree = useDeskree();

  const reviews = ref<Review[] | null>(null);
  const isFetchingReviews = ref(false);
  const isAddingReview = ref(false);

  const count = computed(() => reviews.value?.length || 0);
  const isEmpty = computed(() => count.value === 0);
  const averageRating = computed(() => {
    if (!reviews.value || count.value === 0) return 0;
    const ratingSum = reviews.value.reduce(
      (sum: number, review: any) => sum + review.attributes.rating,
      0
    );
    return +(ratingSum / count.value).toFixed(1);
  });
  const reviewsByRating = computed(() =>
    useGroupBy(reviews.value || [], (review: any) => review.attributes.rating)
  );

  async function fetchReviews(productId: string) {
    isFetchingReviews.value = true;
    const res = await deskree.reviews.get(productId);
    reviews.value = res.data as any;
    isFetchingReviews.value = false;
    return reviews.value;
  }
  async function addReview(review: any) {
    isAddingReview.value = true;
    await deskree.reviews.submit({ ...review });
    isAddingReview.value = false;
  }

  return {
    reviews,
    isEmpty,
    isAddingReview,
    isFetchingReviews,
    count,
    averageRating,
    reviewsByRating,
    fetchReviews,
    addReview,
  };
});
