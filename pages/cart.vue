<script setup>
const selected = ref([]);
const checkAll = ref();
const cartStore = useCartStore();
async function handleCheckout() {
  console.log("checking out");
}
</script>
<template>
  <div class="m-10">
    <h1 class="text-3xl mb-5 font-bold">Your Cart</h1>
    <div class="md:flex w-full">
      <div class="md:w-3/4">
        <div v-if="cartStore.isEmpty" class="italic text-center pt-10">
          Cart is empty
        </div>
        <div v-else class="overflow-x-auto">
          <div class="table w-full">
            <table class="w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" ref="checkAll" />
                    </label>
                  </th>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Number of Items</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(items, id) in cartStore.itemsById" :key="id">
                  <th>
                    <label>
                      <input
                        v-model="selected"
                        type="checkbox"
                        class="checkbox"
                        @change="checkAll.checked = false"
                        :value="id"
                      />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img
                            :src="items[0].fields.image[0].fields.file.url"
                            :alt="
                              items[0].fields.image[0].fields?.file.description
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="font-bold">
                      {{ items[0].fields.name }}
                    </div>
                    <ProductHeat :heat-level="items[0].fields.heatLevel" />
                  </td>
                  <td>
                    <ProductPrice :price="items[0].fields.price" />
                  </td>

                  <td>
                    <input
                      class="input input-bordered w-20"
                      type="number"
                      :value="cartStore.itemsByIdCount(id)"
                      @input="
                        cartStore.updateItemCount(items[0], $event.target.value)
                      "
                    />
                  </td>
                  <th>
                    <NuxtLink
                      :to="{
                        name: 'products-id',
                        params: { id },
                      }"
                    >
                      <button class="btn btn-ghost btn-xs">details</button>
                    </NuxtLink>
                  </th>
                </tr>
              </tbody>
            </table>
            <button v-if="selected.length" class="text-sm text-red-500">
              Remove Selected
            </button>
          </div>
        </div>
      </div>

      <div class="md:w-1/4 pl-5">
        <div class="card bg-slate-50">
          <div class="card-body">
            <ul>
              <li><strong>Subtotal</strong>: $11.95</li>
              <li><strong>Estimated Taxes </strong>: $1.19</li>
              <li><strong>Total</strong>: $13.14</li>
            </ul>
            <div class="card-actions justify-end w-full">
              <button class="btn btn-primary w-full" @click="handleCheckout">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
