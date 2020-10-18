<template>
  <ul class="catalog__list">
    <ProductItem v-for="product in products" :key="product.id"
    :product="product"
    @gotoPage="(pageName, pageParams) => $emit('gotoPage', pageName, pageParams)"/>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: {
    products: Array,
  },
  components: { ProductItem },
};
</script>
