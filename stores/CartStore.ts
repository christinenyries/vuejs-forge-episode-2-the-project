import { watchDebounced } from "@vueuse/core";
import { Product, Status } from "~/types";

export const useCartStore = defineStore("CartStore", () => {
  const taxRate = 0.12;
  const deskree = useDeskree();
  const items = ref<Product[]>([]);
  const status = ref<Status>("unloaded");

  // getters
  const count = computed(() => items.value.length);
  const isEmpty = computed(() => count.value === 0);
  const subtotal = computed(() =>
    items.value.reduce((_subtotal, item) => _subtotal + item.fields.price, 0)
  );
  const taxTotal = computed(() => subtotal.value * taxRate);
  const total = computed(() => subtotal.value + taxTotal.value);

  const itemsById = computed(() =>
    useGroupBy(items.value, (item) => item.sys.id)
  );
  const getItemCountById = computed(
    () => (id: string) => itemsById.value[id].length
  );

  watchDebounced(
    items,
    () => {
      if (!status.value) return;
      deskree.user.updateCart(items.value);
    },
    { deep: true, debounce: 500 }
  );

  deskree.auth.onAuthStateChange(async (user: any) => {
    if (!user) return;
    status.value = "loading";
    const res = await deskree.user.getCart();
    items.value = res.products;
    // wait for watchDebounced above to process new value for `items` before updating `isCartInitialized`
    setTimeout(() => (status.value = "loaded"), 750);
  });

  // actions
  function addItem(item: Product, count = 1) {
    for (let i = 0; i < count; i++) {
      items.value.push(item);
    }
  }
  function clearItem(itemId: string, count?: number) {
    let remainingCount = count || getItemCountById.value(itemId);
    items.value = items.value.filter((_item) => {
      if (_item.sys.id === itemId) {
        remainingCount--;
        return remainingCount < 0;
      }
      return true;
    });
  }
  function updateItemCount(item: Product, newCount: number) {
    const currentCount = getItemCountById.value(item.sys.id);
    const difference = newCount - currentCount;
    if (difference > 0) {
      addItem(item, difference);
    }
    if (difference < 0) {
      clearItem(item.sys.id, Math.abs(difference));
    }
  }
  return {
    status,
    items,
    count,
    subtotal,
    taxTotal,
    total,
    itemsById,
    getItemCountById,
    isEmpty,
    addItem,
    clearItem,
    updateItemCount,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
