<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" name="color"
      :value="color.value" v-model="currentChosenColor">
      <span class="colors__value" :style="{ backgroundColor: color.value, }">
      </span>
    </label>
  </li>
</template>

<script>
export default {
  props: {
    color: Object,
    chosenColor: String,
  },
  computed: {
    currentChosenColor: {
      get() {
        return this.chosenColor;
      },
      set(value) {
        this.$emit('update:chosenColor', value);
      },
    },
  },
};
</script>
