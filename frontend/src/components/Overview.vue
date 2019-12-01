<template>
  <div class="root">
    <h1>Choose your bag</h1>
    <hooper :settings="hooperSettings">
       <slide v-for="(slide, indx) in slides" :key="indx" :index="indx">
        <div class="slide-card">
          <h2>{{ slide.message }}</h2>
        </div>
      </slide>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </div>
</template>

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
}
</style>

<script>
import {Hooper, Slide, Pagination as HooperPagination} from 'hooper';
import 'hooper/dist/hooper.css';
// import here eine api json

export default {
  name: 'App',
  components: {
    Hooper,
    Slide,
    HooperPagination,
  },
  data() {
    return {
      slides: [
        {message: 'Slide 1'},
        {message: 'Slide 2'},
        {message: 'Slide 3'},
        {message: 'Slide 4'},
      ],
      hooperSettings: {
        itemsToShow: 1.25,
        infiniteScroll: true,
        transition: 200,
      },
    };
  },
};
</script>
