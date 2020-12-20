<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ productsCount }}</span>
    </div>

    <div class="content__catalog">
      <ProductFilter :filter.sync="filter"/>
      <section class="catalog">
        <ProductsPreloader v-if="this.$store.state.products.productsLoading"/>
        <div v-if="this.$store.state.products.productsLoadingFailed">
          Произошла ошибка во время загрузки товаров <button @click.prevent="loadProducts">
            Попробовать ещё раз</button>
        </div>
        <ProductList :products="detailProducts"/>
        <BasePagination v-model="page" :count="productsCount" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue';
import BasePagination from '@/components/ui/BasePagination.vue';
import ProductFilter from '@/components/ui/ProductFilter.vue';
import ProductsPreloader from '@/components/ui/ProductsPreloader.vue';
import { mapGetters } from 'vuex';

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
    };
  },
  computed: {
    ...mapGetters([
      'productsCount',
      'detailProducts',
    ]),
  },
  methods: {
    loadProducts() {
      const payload = {
        page: this.page,
        limit: this.productsPerPage,
        categoryId: this.filter.categoryId,
        colorId: this.filter.colorValue,
        minPrice: this.filter.priceFrom,
        maxPrice: this.filter.priceTo,
      };
      this.$store.dispatch('loadProducts', payload, { root: true });
      this.productsData = this.$store.state.products.productsData;
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
