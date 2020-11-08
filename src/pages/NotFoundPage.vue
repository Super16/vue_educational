<template>
  <div class="center">
    <h1>Ошибка загрузки</h1>
    <router-link :to="{name: 'main'}">
      Перейти в каталог
    </router-link>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>

<script>
export default {
};
</script>
