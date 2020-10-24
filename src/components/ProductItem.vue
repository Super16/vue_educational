<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
    @click.prevent="goToPage('product', {'id': product.id})">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ product.price | numberFormat }} ₽</span>

    <ul class="colors colors--black">
      <BaseColors :colors-array="product.colors"/>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';
import BaseColors from './BaseColors.vue';

export default {
  components: { BaseColors },
  filters: {
    numberFormat,
  },
  methods: {
    goToPage,
  },
  props: {
    product: Object,
  },
};
</script>
