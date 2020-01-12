<template>
  <div class="root">
    <h1>My Bags</h1>
    <div class="list-container">
      <div class="list-card" v-for="(packList, indx) in packLists"
      :key="packList.id" :index="indx">
        <router-link class="left-clickable"
        :to="{ name: 'EditList', params: { packList }}">
          <img :src="require('@/assets/1x' + packLists[indx].illustration)"
            :alt="packLists.name" class="card-img-small">
          <div class="mid-info">
            <h1>{{ packLists[indx].name }}</h1>
            <preview :prop="packLists[indx]" />
          </div>
        </router-link>
        <div class="right-info">
          <icon-base width="25" height="25" viewBox="0 0 10 10">
            <icon-share />
          </icon-base>
          <icon-base width="25" height="25" viewBox="0 0 10 10"
          @click.native="deleteList(packList._id)">
            <icon-bucket />
          </icon-base>
        </div>
      </div>
    </div>
    <Navigation/>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconBucket from '@/assets/icons/IconBucket.vue';
import IconShare from '@/assets/icons/IconShare.vue';
import Preview from '@/components/PreviewList.vue';
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'App',
  components: {
    Preview,
    Navigation,
    IconBucket,
    IconBase,
    IconShare,
  },
  data() {
    return {
      packLists: undefined,
      userId: ''
    };
  },
  async mounted() {
    if (await JSON.parse(localStorage.getItem('user')) != null ) {
      try{
        this.userId = await JSON.parse(localStorage.getItem('user'))._id;
        const url = 'http://localhost:3000/my_bags/' + this.userId;
        const response = await fetch(url, {method: 'GET'});
        this.packLists = await response.json();
      } catch (error) {
          console.error(error);
      }
    }
  },
  methods: {
    async deleteList(id) {
      const url = 'http://localhost:3000/my_bags/' + id;
      await fetch(url, {method: 'DELETE'});
      this.$router.go();
    },
  },
};
</script>

<style lang="scss" scoped>

:focus{
  outline: none
}

a{
  text-decoration: none;
}

.list-container{
  height: 75vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding: 0 0 0 0;
  overflow-y: scroll;
  // -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
  // mask-image: linear-gradient(to bottom, black 85%, transparent 100%);

  .list-card{
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 1.5em;
    height: 8em;
    margin: 0 1em 1em 1em;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.05);

    .card-img-small{
      width: 25%;
      height: 25%;
      margin: 0 0 0 0;
      align-self: center;
    }

    .left-clickable{
      display: flex;
      cursor: pointer;
      margin-left: 1em;
    }

    .mid-info{
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 7em;
      margin: 0 1em;
      overflow-y: hidden;

      h1{
        font-size: 1.2rem;
        margin: 1em 0 0.2em 0;
      }
    }

    .right-info{
      display: flex;
      width: 50%;
      justify-content: space-around;
      margin-right: 1em;
      svg{
        cursor: pointer;
      }
    }
  }
}
</style>
