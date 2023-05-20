import { Product } from "~/types";

export const useCartStore = defineStore("CartStore", () => {
  const items = ref<Product[]>([]);
  const count = computed(() => items.value.length);
  const subtotal = computed(() =>
    items.value.reduce((_subtotal, item) => _subtotal + item.fields.price, 0)
  );
  const taxTotal = computed(() => subtotal.value * 0.1);
  const total = computed(() => subtotal.value + taxTotal.value);
  const itemsById = computed(() =>
    useGroupBy(items.value, (item) => item.sys.id)
  );
  const itemsByIdCount = computed(
    () => (id: string) => itemsById.value[id].length
  );
  const isEmpty = computed(() => count.value === 0);

  function addItem(item: Product, count = 1) {
    for (let i = 0; i < count; i++) {
      items.value.push(item);
    }
  }
  function clearItem(item: Product, count?: number) {
    let remainingCount = count || itemsByIdCount.value(item.sys.id);
    items.value = items.value.filter((_item) => {
      if (_item.sys.id === item.sys.id) {
        remainingCount--;
        return remainingCount < 0;
      }
      return true;
    });
  }
  function updateItemCount(item: Product, newCount: number) {
    const currentCount = itemsByIdCount.value(item.sys.id);
    const difference = newCount - currentCount;
    if (difference > 0) {
      addItem(item, difference);
    }
    if (difference < 0) {
      clearItem(item, Math.abs(difference));
    }
  }
  return {
    items,
    count,
    subtotal,
    taxTotal,
    total,
    itemsById,
    itemsByIdCount,
    isEmpty,
    addItem,
    clearItem,
    updateItemCount,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
