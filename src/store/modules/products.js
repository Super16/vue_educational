import axios from 'axios';
import API_BASE_URL from '@/config';

/* eslint no-shadow: ["error", { "allow": ["state", "getters", "actions", "mutations"] }] */
/* eslint-disable no-param-reassign */

export default {
  state: () => ({
    productsLoading: false,
    categoriesData: null,
    colorsData: null,
    productsLoadingFailed: false,
    productsData: null,
    singleProductData: null,
  }),
  getters: {
    productsCount(state) {
      return state.productsData ? state.productsData.pagination.total : 0;
    },
    detailProducts(state) {
      return state.productsData ? state.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      }))
        : [];
    },
  },
  mutations: {
    updateProductsData(state, products) {
      state.productsData = products;
    },
    updateSingleProductsData(state, singleProduct) {
      state.singleProductData = singleProduct;
    },
    turnOnLoading(state, rootState) {
      rootState.cartLoading = true;
      state.productsLoading = true;
    },
    turnOffLoading(state, rootState) {
      rootState.cartLoading = false;
      state.productsLoading = false;
    },
    turnOnFailed(state) {
      state.productsLoadingFailed = true;
    },
    turnOffFailed(state) {
      state.productsLoadingFailed = false;
    },
    updateCategoriesData(state, categories) {
      state.categoriesData = categories;
    },
    updateColorsData(state, colors) {
      state.colorsData = colors;
    },
  },
  actions: {
    loadCategories(context) {
      return axios.get(
        `${API_BASE_URL}api/productCategories`,
      ).then((response) => {
        context.commit('updateCategoriesData', response.data, { root: true });
      });
    },
    loadColors(context) {
      return axios.get(
        `${API_BASE_URL}api/colors`,
      ).then((response) => {
        context.commit('updateColorsData', response.data, { root: true });
      });
    },
    loadProducts(context, {
      page, limit, categoryId, colorId, minPrice, maxPrice,
    }) {
      context.commit('turnOnLoading', { root: true });
      context.commit('turnOffFailed', { root: true });
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => {
          axios.get(
            `${API_BASE_URL}api/products`, {
              params: {
                page,
                limit,
                categoryId,
                colorId,
                minPrice,
                maxPrice,
              },
            },
          ).then((response) => {
            context.commit('updateProductsData', response.data, { root: true });
          }).catch(() => {
            context.commit('turnOnFailed', { root: true });
          }).then(() => {
            context.commit('turnOffLoading', { root: true });
          });
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => {
          axios.post(
            `${API_BASE_URL}api/baskets/products`, {
              productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.rootState.cart.userAccessKey,
              },
            },
          ).then((response) => {
            context.commit('updateCartProductsData', response.data.items, { root: true });
            context.commit('syncCartProducts', response.data.items, { root: true });
          });
        });
    },
    loadSingleProduct(context, productId) {
      context.commit('turnOnLoading', { root: true });
      context.commit('turnOffFailed', { root: true });
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => {
          axios.get(
            `${API_BASE_URL}api/products/${productId}`,
          ).then((response) => {
            context.commit('updateSingleProductsData', response.data, { root: true });
          }).catch(() => {
            context.commit('turnOnFailed', { root: true });
            this.$router.replace({ name: 'notFound' });
          }).then(() => {
            context.commit('turnOffLoading', { root: true });
          });
        });
    },
  },
};
