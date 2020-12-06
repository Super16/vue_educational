<template>
  <div>
    <main class="content container" v-if="order.id">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
              Корзина
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Оформление заказа
            </a>
          </li>
        </ul>

        <h1 class="content__title">
          Заказ оформлен <span>№ {{ order.id }}</span>
        </h1>
      </div>
      <OrderInfo :order="order"/>
    </main>
    <main v-else>
      <h1 class="content__title">
        Произошла ошибка
      </h1>
      <router-link :to="{name: 'cart'}">
        Перейти в корзину
      </router-link>
    </main>
  </div>
</template>

<script>
import OrderInfo from '@/components/OrderInfo.vue';

export default {
  components: { OrderInfo },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadOrderInfo();
      },
      immediate: true,
    },
  },
  computed: {
    order() {
      return this.$store.state.orderInfo;
    },
  },
  methods: {
    loadOrderInfo() {
      this.$store.dispatch('loadOrderInfo', this.$route.params.id);
    },
  },
};
</script>
