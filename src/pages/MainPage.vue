<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ countProducts }}</span>
    </div>

    <div class="content__catalog">
      <ProductFilter :filter.sync="filter"/>
      <section class="catalog">
        <ProductsPreloader v-if="productsLoading"/>
        <div v-if="productsLoadingFailed">
          Произошла ошибка во время загрузки товаров <button @click.prevent="loadProducts">
            Попробовать ещё раз</button>
        </div>
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import ProductFilter from '@/components/ui/ProductFilter.vue';
import ProductsPreloader from '@/components/ui/ProductsPreloader.vue';
import axios from 'axios';
import API_BASE_URL from '../config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    ProductsPreloader,
  },
  data() {
    return {
      filter: {
        priceFrom: 0,
        priceTo: 0,
        categoryId: 0,
        colorValue: 0,
      },
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(
          `${API_BASE_URL}api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filter.categoryId,
              minPrice: this.filter.priceFrom,
              maxPrice: this.filter.priceTo,
              colorId: this.filter.colorValue,
            },
          },
        ).then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filter: {
      handler() {
        this.loadProducts();
      },
      deep: true,
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
