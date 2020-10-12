<template>
  <li class="catalog__item" >
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>
    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ product.price }} ₽</span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in productColors(product.colors)" :key="color">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.code">
          <span class="colors__value" :style="{ backgroundColor: color.code, }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '../data/colors';

export default {
  computed: {
    colors() {
      return colors;
    },
  },
  props: {
    product: Object,
  },
  methods: {
    productColors(value) {
      let productColors = colors;

      productColors = productColors.filter((item) => value.includes(item.id));

      return productColors;
    },
  },
};
</script>
