import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/',
    meta: {
      pageName: 'Каталог',
    },
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
    meta: {
      pageName: 'Товар',
    },
  },
  {
    name: 'cart',
    component: CartPage,
    path: '/cart',
    meta: {
      pageName: 'Корзина',
    },
  },
  {
    name: 'order',
    component: OrderPage,
    path: '/order',
    meta: {
      pageName: 'Оформление заказа',
    },
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '*',
    meta: {
      pageName: 'Страница не найдена',
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
