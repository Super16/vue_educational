<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
          <label class="form__label form__label--price">
            <input class="form__input" type="text" name="min-price"
            v-model.number="currentPriceFrom">
            <span class="form__value">От</span>
          </label>
          <label class="form__label form__label--price">
            <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
            <span class="form__value">До</span>
          </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category"
          v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories"
            :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <BaseColors :colors-array="colors"
        :chosen-color.sync="currentColorValue"/>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import BaseColors from '@/components/ui/BaseColors.vue';

export default {
  components: { BaseColors },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorValue: 0,
      categoriesData: null,
      colorsData: null,
    };
  },
  props: {
    filter: {
      priceFrom: Number,
      priceTo: Number,
      categoryId: Number,
      colorValue: Number,
    },
  },
  computed: {
    categories() {
      return this.$store.state.products.categoriesData
        ? this.$store.state.products.categoriesData.items : [];
    },
    colors() {
      return this.$store.state.products.colorsData
        ? this.$store.state.products.colorsData.items : [];
    },
  },
  watch: {
    filter() {
      this.currentPriceFrom = this.filter.priceFrom;
      this.currentPriceTo = this.filter.priceTo;
      this.currentCategoryId = this.filter.categoryId;
      this.currentColorValue = this.filter.colorValue;
    },
  },
  methods: {
    submit() {
      this.$emit('update:filter', {
        priceFrom: this.currentPriceFrom,
        priceTo: this.currentPriceTo,
        categoryId: this.currentCategoryId,
        colorValue: this.currentColorValue,
      });
    },
    reset() {
      this.$emit('update:filter', {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorValue: 0,
      });
    },
    loadCategories() {
      this.$store.dispatch('loadCategories', { root: true });
    },
    loadColors() {
      this.$store.dispatch('loadColors', { root: true });
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</script>
