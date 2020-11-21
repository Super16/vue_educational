<template>
  <div>
    <main class="content container" v-if="this.$store.state.cartLoading">
      <ProductsPreloader/>
    </main>
    <main class="content container" v-if="products">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'main'}">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link">
              Корзина
            </a>
          </li>
        </ul>

        <h1 class="content__title">Корзина</h1>
        <span class="content__info">{{ productsCount }} {{ declOfNum }}</span>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul class="cart__list">
              <CartItem v-for="item in products" :key="item.productId" :item="item"/>
            </ul>
          </div>
          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
            </p>

            <router-link tag="button" :to="{name: 'order'}" v-show="productsCount > 0"
            class="cart__button button button--primery" type="submit">
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declOfNum from '@/helpers/declOfNum';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import ProductsPreloader from '@/components/ProductsPreloader.vue';

export default {
  components: { CartItem, ProductsPreloader },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      productsCount: 'cartProductsCount',
    }),
    declOfNum,
  },
};
</script>
