<template>
  <div>
    <TheHeader/>
    <router-view/>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import { mapActions, mapMutations } from 'vuex';

export default {
  components: { TheHeader, TheFooter },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
