<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#"
    @click.prevent="gotoPage('product', {'id': product.id})">
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
import eventBus from '@/eventBus';
import BaseColors from './BaseColors.vue';

export default {
  components: { BaseColors },
  methods: {
    gotoPage(pageName, pageParams) {
      eventBus.$emit('gotoPage', pageName, pageParams);
    },
  },
  props: {
    product: Object,
  },
};
</script>
