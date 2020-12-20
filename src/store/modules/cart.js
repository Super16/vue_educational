import axios from 'axios';
import API_BASE_URL from '@/config';
import router from '@/router/index';

/* eslint no-shadow: ["error", { "allow": ["state", "getters", "actions", "mutations"] }] */
/* eslint-disable no-param-reassign */

export default {
  state: () => ({
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    cartLoading: false,
    orderInfo: null,
    formError: {},
    formErrorMessage: '',
    sendingOrder: false,
  }),
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
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
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
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateFormError(state, formError) {
      state.formError = formError;
    },
    updateFormErrorMessage(state, formErrorMessage) {
      state.formErrorMessage = formErrorMessage;
    },
    sendingOrderOn(state) {
      state.sendingOrder = true;
    },
    sendingOrderOff(state) {
      state.sendingOrder = false;
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios.get(
        `${API_BASE_URL}api/orders/${orderId}`, {
          params: { userAccessKey: context.rootState.cart.userAccessKey },
        },
      ).then((response) => {
        context.commit('updateOrderInfo', response.data, { root: true });
      }).catch(() => {
        context.commit('updateOrderInfo', {}, { root: true });
      });
    },
    loadCart(context) {
      context.commit('turnOnLoading', { root: true });
      return axios.get(
        `${API_BASE_URL}api/baskets`, {
          params: { userAccessKey: context.rootState.cart.userAccessKey },
        },
      ).then((response) => {
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', response.data.user.accessKey);
          context.commit('updateUserAccessKey', response.data.user.accessKey, { root: true });
        }
        context.commit('updateCartProductsData', response.data.items, { root: true });
        context.commit('syncCartProducts', response.data.items, { root: true });
        context.commit('turnOffLoading', { root: true });
      });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount }, { root: true });
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => {
          axios.put(
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
          }).catch(() => {
            context.commit('syncCartProducts', { root: true });
          });
        });
    },
    deleteCartProduct(context, { productId }) {
      context.commit('deleteCartProduct', productId, { root: true });
      return (new Promise((resolve) => setTimeout(resolve, 0)))
        .then(() => {
          axios.delete(
            `${API_BASE_URL}api/baskets/products`, {
              params: {
                userAccessKey: context.rootState.cart.userAccessKey,
              },
              data: {
                productId,
              },
            },
          ).then(() => {
            context.commit('deleteCartProduct', productId, { root: true });
          }).catch(() => {
            context.commit('syncCartProducts', { root: true });
          });
        });
    },
    order(context, formData) {
      context.commit('updateFormError', {}, { root: true });
      context.commit('updateFormErrorMessage', '', { root: true });
      context.commit('sendingOrderOn', { root: true });
      return axios.post(`${API_BASE_URL}api/orders`, {
        ...formData,
      }, {
        params: {
          userAccessKey: context.rootState.cart.userAccessKey,
        },
      }).then(
        (response) => {
          context.commit('resetCart', { root: true });
          context.commit('updateOrderInfo', response.data, { root: true });
          context.commit('sendingOrderOff', { root: true });
          router.push(
            {
              name: 'orderInfo',
              params: {
                id: response.data.id,
              },
            },
          );
        },
      ).catch((error) => {
        context.commit('updateFormError', error.response.data.error.request, { root: true });
        context.commit(
          'updateFormErrorMessage',
          error.response.data.error.message,
          { root: true },
        );
        context.commit('sendingOrderOff', { root: true });
      });
    },
  },
};
