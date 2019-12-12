<template>
  <div class="root">
    <h1>Choose your bag</h1>
    <hooper :settings="hooperSettings">
       <slide v-for="(slide, indx) in slides" :key="indx" :index="indx">
        <div class="slide-card">
          <img :src="require('@/assets/1x' + slide.illustration)"
            :alt="'img of ' + slide.name" class="card-img-big">
          <h2>{{ slide.name }}</h2>
          <button class="add-btn">
            <router-link :to="{ name: 'List', params: { slide }}">
              <icon-base width="20" height="20">
                <icon-add />
              </icon-base>
              &nbsp;create list
            </router-link>
          </button>
        </div>
      </slide>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
    <Navigation/>
  </div>
</template>


<script>
import Navigation from '@/components/Navigation.vue';
import {Hooper, Slide, Pagination as HooperPagination} from 'hooper';
import IconBase from '@/components/IconBase.vue';
import IconAdd from '@/assets/icons/IconAdd.vue';
import 'hooper/dist/hooper.css';

export default {
  name: 'App',
  components: {
    Navigation,
    Hooper,
    Slide,
    HooperPagination,
    IconBase,
    IconAdd,
  },
  data() {
    return {
      slides: undefined,
      hooperSettings: {
        itemsToShow: 1.25,
        infiniteScroll: true,
        transition: 200,
        centerMode: true,
      },
    };
  },
  async mounted() {
    // fetch API data here
    const url = 'http://localhost:3000/bag_templates';

    const response = await fetch(url, {method: 'GET'});
    const data = await response.json();
    this.slides = data;
  },
};
</script>


<style lang="scss" scoped>

.hooper{
  height: 65vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  .slide-card{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 1.5em;
    height: 60vh;
    margin: 0 1em;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.05);
  }

  .hooper-indicator {
    margin: 0 1em;
    width: 9px;
    height: 9px;
    border-radius: 5em;
  }

  .add-btn{
    background: navy;
    width: 60%;
    border: none;
    margin: 1em 0 0 0;
    color: #fff;
    padding: 0.6em 0;
    border-radius: 15em;
    box-shadow: 0 20px 20px rgba(0, 0, 0, 0.19), 0 4px 15px rgba(0, 0, 0, 0.1);

    a {
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: #fff;
        &:hover{
          color: blue;
        }
      }
  }

  .card-img-big{
    width: 70%;
    margin: 0 0 3em 0;
  }
}
</style>
