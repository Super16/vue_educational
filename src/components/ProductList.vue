<template>
  <ProductItem :products="products"/>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};
</script>
