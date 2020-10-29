<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120"
      height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>
    <ItemAmount v-model.number="amount" :amount.sync="amount"/>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button"
    aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import ItemAmount from '@/components/ItemAmount.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';

export default {
  props: {
    item: Object,
  },
  filters: {
    numberFormat,
  },
  components: { ItemAmount },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
  watch: {
    amount(value) {
      if (value === 0) {
        this.deleteProduct(this.item.productId);
      }
    },
  },
};
</script>
