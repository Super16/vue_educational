<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ product.price }} ₽</span>

    <ul class="colors colors--black">
      <BaseColor v-for="color in product.colors" :key="color.value" :color="color"/>
    </ul>
  </li>
</template>

<script>
import BaseColor from './BaseColor.vue';

export default {
  components: { BaseColor },
  props: {
    product: Object,
  },
};
</script>
