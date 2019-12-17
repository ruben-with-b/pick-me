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
          <li
            v-for="(item, index) in listContent.content"
            :key="item.id"
            :title="item.title"
            @remove="this.packlist.splice(index, 1)"
          >
            <input type="checkbox">
            {{ item.name }}
            <button @click="removeTask(index)">X</button>
          </li>
        </ul>
        <form class="flex newItem" v-on:submit.prevent="addNewListItem">
          <input
            class="listitem-input"
            v-model="newPackItem"
            id="new-item"
            placeholder="Add list item"
          >
          <button>&#10003;</button>
        </form>
      </div>
    </div>
    <NavigationList @send="saveList"/>
  </div>
</template>

<script>
import NavigationList from '@/components/NavigationList.vue';

export default {
  name: 'App',
  props: ['slide', 'name'],
  components: {
    NavigationList,
  },
  data() {
    return {
      list: this.slide,
      newTodoText: '',
      newPackItem: '',
      packlist: [], // object
      listContent: {
        name: this.slide.name,
        illustration: this.slide.illustration,
        content: [],
      },
    };
  },
  methods: {
    addNewListItem() {
      this.listContent.content.push({
        name: this.newPackItem,
        state: true,
      });
      this.newTodoText = '';
    },
    removeTask(index) {
      this.listContent.content.splice(index, 1);
    },
    async saveList() {
      const url = 'http://localhost:3000/my_bags';
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.listContent),
      });
      const output = await response;
      console.log(this.packlist);
      console.log(output);
    },
  },
};
</script>

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
      line-height: 2.3rem;

      button{
        color: #fff;
        cursor: pointer;
      }
    }

    .listitem-input{
      margin: 0 0 0 1.4rem;
      width: auto;
      border:none;
      border-bottom: 1px solid #fff;
      background-image:none;
      background-color:transparent;
      box-shadow: none;
      color: #fff;
      font-size: 1.3rem;
    }

    .newItem{
      button{
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
