<template>
  <div>
    <main class="content container" v-if="productLoading">
      <ProductsPreloader/>
    </main>
    <main class="content container" v-if="productData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
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
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

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
import BaseColors from '@/components/BaseColors.vue';
import ItemAmount from '@/components/ItemAmount.vue';
import ProductsPreloader from '@/components/ProductsPreloader.vue';
import axios from 'axios';
import { mapActions } from 'vuex';
import API_BASE_URL from '../config';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
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
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(
          `${API_BASE_URL}api/products/${this.$route.params.id}`,
        ).then((response) => { this.productData = response.data; })
          .catch(() => {
            this.productLoadingFailed = true;
            this.$router.replace({ name: 'notFound' });
          })
          .then(() => { this.productLoading = false; });
      }, 0);
    },
  },
};
</script>
