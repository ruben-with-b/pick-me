<template>
  <div class="root">
    <div class="header">
      <img :src="require('@/assets/1x' + list.illustration)"
        alt="backpack" class="symbol-img">
    </div>
    <div class="list-body">
      <div class="packlist-wrapper">
        <input class="listname-input" :value="list.name">
        <ul class="packlist">
          <li>
            <input type="checkbox">
            item 1
            <button>X</button>
          </li>
          <li>
            <input type="checkbox">
            item 2
            <button>X</button>
          </li>
          <li>
            <input type="checkbox">
            item 3
            <button>X</button>
          </li>
          <li>
            <input type="checkbox">
            item 4
            <button>X</button>
          </li>
        </ul>
      </div>
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

  .packlist-wrapper{
    width: 70%;

    .listname-input{
      margin: 2em 0 0 0;
      width: 100%;
      border:none;
      border-bottom: 3px solid #fff;
      background-image:none;
      background-color:transparent;
      box-shadow: none;
      color: #fff;
    }

    .packlist{
      list-style: none;
      margin: 3em 0 0 0;
      padding: 0;
      font-size: 1.3rem;
      line-height: 1.7rem;

      button{
        color: #fff;
        cursor: pointer;
      }
    }
  }
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
