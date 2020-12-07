<template>
  <ul class="colors">
    <li class="colors__item" v-for="color in colorsArray" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color"
        :value="color.id" v-model="currentChosenColor">
        <span class="colors__value" :style="{ backgroundColor: color.code, }">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    colorsArray: Array,
    chosenColor: Number,
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
