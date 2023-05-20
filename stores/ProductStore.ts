import { Product } from "~/types";
export const useProductStore = defineStore("ProductStore", {
  state: () => {
    const route = useRoute();
    return {
      /**
       * The listing of all the products
       */
      products: [] as Product[],

      /**
       * Different ways of fetching the listing of products (filters, order, search)
       */
      filters: {
        "fields.heatLevel": route.query["fields.heatLevel"] || "",
        order: route.query.order || "",
        query: route.query.query || "",
      },

      /**
       * A single project to show all the details of
       */
      singleProduct: null as Product | null,
    };
  },
  getters: {
    activeFilters() {
      const clone = JSON.parse(JSON.stringify(this.filters));
      // remove blank object properties
      return Object.fromEntries(
        Object.entries(clone).filter(([_, v]) => v != null && v !== "")
      );
    },
  },
  actions: {
    async fetchProducts() {
      const { $contentful } = useNuxtApp();
      const entries = await $contentful.getEntries({
        content_type: "product",
        ...this.activeFilters,
      });
      this.products = entries.items as Product[];
      return this.products;
    },
    async fetchProduct(id: string) {
      const { $contentful } = useNuxtApp();
      this.singleProduct = await $contentful.getEntry(id);
      return this.singleProduct;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
