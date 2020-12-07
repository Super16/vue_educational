<template>
  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">
          Благодарим за&nbsp;выбор нашего магазина.
          На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
          Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;
          течение часа для уточнения деталей доставки.
        </p>

        <ul class="dictionary">
          <li class="dictionary__item">
            <span class="dictionary__key">Получатель</span>
            <span class="dictionary__value">{{ order.name }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Адрес доставки</span>
            <span class="dictionary__value">{{ order.address }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">Телефон</span>
              <span class="dictionary__value">{{ order.phone }}</span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">E-mail</span>
            <span class="dictionary__value">
                {{ order.email }}</span>
          </li>
        </ul>
      </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in order.basket.items" :key="item.product.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price }}</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого:
                <b>{{ order.basket.items.length | declOfProducts }}</b>
                на сумму <b>{{ order.totalPrice | numberFormat }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
</template>

<script>
import declOfProducts from '@/helpers/declOfProducts';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: {
    order: Object,
  },
  filters: {
    numberFormat,
    declOfProducts,
  },
};
</script>
