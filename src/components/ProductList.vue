<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id"
    :product="product" :page-route="pageRoute"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: {
    products: Array,
    pageRoute: Function,
  },
  components: { ProductItem },
};
</script>
