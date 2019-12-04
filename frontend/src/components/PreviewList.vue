<template>
  <div class="root">
    <ul>
      <li v-for="(list, indx) in prevList" :key="indx" :index="indx">
        {{ prevList[indx].content[indx].name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

ul{
  list-style: none;
  margin: 0;
  padding: 0;
   -webkit-mask-image: linear-gradient(to bottom, black -65%, transparent 95%);
  mask-image: linear-gradient(to bottom, black -65%, transparent 95%);
}

</style>

<script>

export default {
  name: 'App',
  props: {
    prop: Array,
  },
  components: {

  },
  data() {
    return {
      prevList: this.prop,
    };
  },
  mounted() {
    return console.log(this.lists);
  },
};
</script>
