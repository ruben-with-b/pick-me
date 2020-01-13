<template>
  <div class="root">
    <div class="header">
      <img :src="require('@/assets/1x' + list.illustration)"
        alt="bag" class="symbol-img">
    </div>
    <div class="list-body">
      <div class="packlist-wrapper">
        <input class="listname-input"
          v-model="listContent.name">
        <ul class="packlist">
          <li
            v-for="(item, index) in listContent.content"
            :key="item.id"
            :title="item.title"
          >
            <span v-if="item.name">
              <p-check class="p-svg p-curve p-thick p-jelly" id="checkbox"
                v-model="item.state">
                <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                  <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                        style="stroke: white;fill:white"></path>
                </svg>
              </p-check>
                {{ item.name }}
              <button @click="removeTask(index)">
                <icon-base width="35" height="35" viewBox="0 0 10 5">
                  <icon-close />
                </icon-base>
              </button>
            </span>
          </li>
        </ul>
        <form class="flex newItem" v-on:submit.prevent="addNewListItem">
          <input
            class="listitem-input"
            v-model="newPackItem"
            id="new-item"
            placeholder="Add list item"
          >
          <button>
            <icon-base width="35" height="35" viewBox="0 0 10 5">
              <icon-save />
            </icon-base>
          </button>
        </form>
      </div>
    </div>
    <button class="cancel" @click="$router.go(-1)">
      <icon-base width="35" height="35" viewBox="0 0 10 4">
        <icon-back />
      </icon-base>
      <span>cancel</span>
    </button>
    <NavigationList @send="saveList"/>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconClose from '@/assets/icons/IconClose.vue';
import IconBack from '@/assets/icons/IconBack.vue';
import IconSave from '@/assets/icons/IconSave.vue';
import NavigationList from '@/components/NavigationList.vue';

export default {
  name: 'App',
  props: ['slide', 'name'],
  components: {
    NavigationList,
    IconBase,
    IconClose,
    IconSave,
    IconBack,
  },
  data() {
    return {
      list: this.slide, // this.packList
      newTodoText: '',
      newPackItem: '',
      checked: null,
      listName: '',
      packlist: [],
      listContent: {
        name: this.slide.name,
        illustration: this.slide.illustration,
        byUser: '',
        content: [
          {
            name: null,
            state: null,
          },
        ],
      },
    };
  },
  methods: {
    addNewListItem() {
      if (this.newPackItem !== '') {
        this.listContent.content.push({
          name: this.newPackItem,
          state: false,
        });
        this.newPackItem = ''; // clear input
      }
    },
    removeTask(index) {
      this.listContent.content.splice(index, 1);
    },
    async saveList() {
      // get user id to set into json
      this.listContent.byUser = await JSON.parse(localStorage.getItem('user'))._id;
      const url = 'http://localhost:3000/my_bags';
      // if packlist is not without items
      if (this.listContent.content.length > 1) {
        try{
          // post json to server
          await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.listContent),
          });
          this.$router.push({path: '/'});
          } catch (error) {
            console.error(error);
        }  
      }
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

.pretty {
  margin-right: 0.05em;
}

.cancel{
  position: fixed;
  bottom: 1em;
  left: 0.5em;
  color: #ffffff;
}
</style>
