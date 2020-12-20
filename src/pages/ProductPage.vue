<template>
  <div>
    <main class="content container" v-if="this.$store.state.products.productsLoading">
      <ProductsPreloader/>
    </main>
    <main class="content container" v-if="product">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url"
          :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <BaseColors :colors-array="product.colors"/>
            </fieldset>

            <div class="item__row">
              <ItemAmount v-model.number="productAmount" :amount.sync="productAmount"/>
              <button class="button button--primery" type="submit"
              :disabled="productAddSending">
                В корзину
              </button>
            </div>
            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавляем товар в корзину...</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <div class="item__content">
          {{ product.content }}
        </div>
      </div>
    </section>
  </main>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import BaseColors from '@/components/ui/BaseColors.vue';
import ItemAmount from '@/components/product/ItemAmount.vue';
import ProductsPreloader from '@/components/ui/ProductsPreloader.vue';

export default {
  data() {
    return {
      productAmount: 1,
      productAdded: false,
      productAddSending: false,
    };
  },
  components: { BaseColors, ItemAmount, ProductsPreloader },
  filters: {
    numberFormat,
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
    productAmount(value) {
      if (value < 1) {
        this.productAmount = 1;
      }
    },
  },
  computed: {
    product() {
      return this.$store.state.products.singleProductData;
    },
  },
  methods: {
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.$store.dispatch(
        'addProductToCart',
        { productId: this.product.id, amount: this.productAmount },
        { root: true },
      ).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
      });
    },
    loadProduct() {
      this.$store.dispatch('loadSingleProduct', this.$route.params.id, { root: true });
    },
  },
};
</script>
