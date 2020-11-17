import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_BASE_URL from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: false,
  },
  mutations: {
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find(
        (i) => i.productId === productId,
      );

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.productId !== productId,
      );
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(
        (item) => ({
          productId: item.product.id,
          amount: item.quantity,
        }),
      );
    },
    turnOnLoading(state) {
      state.cartLoading = true;
    },
    turnOffLoading(state) {
      state.cartLoading = false;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find(
          (p) => p.product.id === item.productId,
        );
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (
        item.product.price * item.amount
      ) + acc, 0);
    },
    cartProductsCount(state) {
      return state.cartProducts.length;
    },
  },
  actions: {
    loadCart(context) {
      context.commit('turnOnLoading');
      return axios.get(
        `${API_BASE_URL}api/baskets`, {
          params: { userAccessKey: context.state.userAccessKey },
        },
      ).then((response) => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey);
        }
        context.commit('updateCartProductsData', response.data.items);
        context.commit('syncCartProducts', response.data.items);
        context.commit('turnOffLoading');
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
                userAccessKey: context.state.userAccessKey,
              },
            },
          ).then((response) => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts', response.data.items);
          });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => {
          axios.put(
            `${API_BASE_URL}api/baskets/products`, {
              productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            },
          ).then((response) => {
            context.commit('updateCartProductsData', response.data.items);
          }).catch(() => {
            context.commit('syncCartProducts');
          });
        });
    },
    deleteCartProduct(context, { productId }) {
      context.commit('deleteCartProduct', productId);
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => {
          axios.delete(
            `${API_BASE_URL}api/baskets/products`, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
              data: {
                productId,
              },
            },
          ).then(() => {
            context.commit('deleteCartProduct', productId);
          }).catch(() => {
            context.commit('syncCartProducts');
          });
        });
    },
  },
});
