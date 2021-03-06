import BaseFormField from '@/components/ui/BaseFormField.vue';

export default {
  props: {
    title: String,
    error: String,
    placeholder: String,
    value: String,
  },
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
