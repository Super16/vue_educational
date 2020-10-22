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
      <BaseColor :colors-array="product.colors"/>
    </ul>
  </li>
</template>

<script>
import BaseColor from './BaseColor.vue';

export default {
  components: { BaseColor },
  props: {
    product: Object,
    pageRoute: Function,
  },
};
</script>
