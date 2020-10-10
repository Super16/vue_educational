<template>
  <ProductItem :products="products"/>
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
