<template>
  <div>
    <h1>My Bags</h1>
    <div class="list-container">
        <div v-for="(list, indx) in lists" :key="indx" :index="indx"
          class="list-card">
          <img :src="require('@/assets/1x' + lists[indx].illustration)"
            :alt="lists.name" class="card-img-small">
          <div class="right-info">
            <h2>{{ lists[indx].name }}</h2>
            <preview :prop="lists" />
          </div>
        </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-container{
  height: 65vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  .list-card{
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 1.5em;
    height: 8em;
    margin: 0 1em 1em 1em;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.05);
    cursor: pointer;

    .card-img-small{
      width: 25%;
      margin: 0 0 0 0;
    }

    .right-info{
      display: flex;
      flex-direction: column;
      // justify-content: center;
      // align-items: center;
      // border:  2px solid navy;
      width: 100%;
      height: 100%;
      margin: 0 1em;
      overflow-y: hidden;

      h2{
        font-size: 1.2rem;
      }
    }
  }
}
</style>

<script>
import Preview from '@/components/PreviewList.vue';

export default {
  name: 'App',
  components: {
    Preview,
  },
  data() {
    return {
      lists: undefined,
    };
  },
  async mounted() {
    const url = 'http://localhost:3000/my_bags';

    const response = await fetch(url, {method: 'GET'});
    const data = await response.json();
    this.lists = data;
  },
};
</script>
