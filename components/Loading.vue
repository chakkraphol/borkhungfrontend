<template>
  <div class="loading-page">
    <img src="~/assets/images/loading.gif" />
  </div>
</template>

<script>
export default {
  /* data: () => ({
    loading: true
  }) */
};
</script>
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 999;
}
</style>
