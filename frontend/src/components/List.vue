<template>
  <div class="root">
    <div class="header">
      <img :src="require('@/assets/1x' + list.illustration)"
        alt="backpack" class="symbol-img">
    </div>
    <div class="list-body">
      <input :placeholder="list.name">
    </div>
  </div>
</template>

<style lang="scss" scoped>

.header{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24vh;
  background: #fff;

  .symbol-img{
    width: 3.5em;
    margin-top: -2em;
  }
}

.list-body{
  display: flex;
  align-items: center;
  flex-direction: column;
  background: navy;
  color: #fff;
  border-top-left-radius: 5em;
  width: 100vw;
  height: 85vh;
  margin-top: -9vh;
  z-index: 10;
}

</style>

<script>
export default {
  name: 'App',
  props: ['slide'],
  components: {
  },
  data() {
    return {
      list: this.slide,
    };
  },
};
</script>
