<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
    @click.prevent="pageRoute('product', {'id': product.id})">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ product.price }} ₽</span>

    <ul class="colors colors--black">
      <BaseColors :colors-array="product.colors"/>
    </ul>
  </li>
</template>

<script>
import BaseColors from './BaseColors.vue';

export default {
  components: { BaseColors },
  props: {
    product: Object,
    pageRoute: Function,
  },
};
</script>
