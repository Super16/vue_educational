<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
    @click="decrementAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <input type="text" v-model="currentAmount">
    <button type="button" aria-label="Добавить один товар"
    @click="incrementAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    amount: Number,
  },
  computed: {
    currentAmount: {
      get() {
        return this.amount;
      },
      set(value) {
        return this.$emit('update:amount', value);
      },
    },
  },
  methods: {
    incrementAmount() {
      this.currentAmount += 1;
    },
    decrementAmount() {
      this.currentAmount -= 1;
    },
  },
};
</script>
