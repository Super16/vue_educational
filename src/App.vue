<template>
  <component :is="currentPageComponent" :page-params="currentPageParams"
  :page-route="goToPage"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  name: 'App',
  components: { MainPage, ProductPage, NotFoundPage },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || NotFoundPage;
    },
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {
      },
    };
  },
};
</script>
