<template>
  <div class="center">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.loader {
  border: 8px solid #f4f4f4;
  border-top: 8px solid #272727;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<script>
export default {
};
</script>
