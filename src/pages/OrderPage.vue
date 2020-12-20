<template>
  <main class="content container">
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
        Корзина
      </h1>
      <span class="content__info">
        {{ cartProductsCount | declOfProducts }}
      </span>
    </div>

    <section class="cart">
      <ProductsPreloader v-if="this.$store.state.cart.sendingOrder"/>
      <form class="cart__form form" action="#" method="POST"
      @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-for="form in textForms" :key="form.title"
            :title="form.title" :placeholder="form.placeholder"
            v-model="formData[form.data]" :error="formError[form.data]"/>
            <BaseFormTextarea title="Комментарий к заказу" placeholder="Ваши пожелания"
            v-model="formData.comment" :error="formError.comment"/>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in cartDetailProducts" :key="item.productId">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ cartProductsCount | declOfProducts }}</b> на сумму
            <b>{{ cartTotalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import declOfProducts from '@/helpers/declOfProducts';
import numberFormat from '@/helpers/numberFormat';
import textForms from '@/data/textForms';
import { mapGetters } from 'vuex';
import BaseFormText from '@/components/ui/BaseFormText.vue';
import BaseFormTextarea from '@/components/ui/BaseFormTextarea.vue';
import ProductsPreloader from '@/components/ui/ProductsPreloader.vue';

export default {
  data() {
    return {
      formData: {},
      sendingOrder: false,
    };
  },
  filters: {
    numberFormat,
    declOfProducts,
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
    ProductsPreloader,
  },
  computed: {
    ...mapGetters([
      'cartDetailProducts',
      'cartTotalPrice',
      'cartProductsCount',
    ]),
    textForms() {
      return textForms;
    },
    formError() {
      return this.$store.state.cart.formError;
    },
    formErrorMessage() {
      return this.$store.state.cart.formErrorMessage;
    },
  },
  methods: {
    order() {
      this.$store.dispatch('order', this.formData, { root: true });
    },
  },
  created() {
    this.$store.commit('updateFormError', {}, { root: true });
    this.$store.commit('updateFormErrorMessage', '', { root: true });
  },
};
</script>
