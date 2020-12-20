<template>
  <div>
    <router-link class="header__cart" aria-label="Корзина с товарами"
    :to="{name: 'cart'}" v-if="this.$store.state.cart.cartLoading">
      <div class="center">
        <div class="loader"></div>
      </div>
    </router-link>
    <router-link class="header__cart" aria-label="Корзина с товарами"
    :to="{name: 'cart'}" v-else>
      <svg width="30" height="21" fill="currentColor">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">
        {{ $store.state.cart.cartProducts.length }}
      </span>
    </router-link>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.loader {
  border: 4px solid #f4f4f4;
  border-top: 4px solid #9eff00;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<script>
export default {
  methods: {
    loadCart() {
      this.$store.dispatch('loadCart', { root: true });
    },
  },
  created() {
    this.loadCart();
  },
};
</script>
