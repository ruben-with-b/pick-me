<template>
  <div>
    <h1>Choose your bag</h1>
    <hooper :settings="hooperSettings">
      <slide>
        slide 1
      </slide>
      <slide>
        slide 2
      </slide>
      <slide>
        slide 3
      </slide>
      <slide>
        slide 4
      </slide>
      <slide>
        slide 5
      </slide>
      <slide>
        slide 6
      </slide>
    </hooper>
  </div>
</template>

<style lang="scss" scoped>
.hooper{
  height: 60vh;
  margin: 1em 0 0 0;
  .hooper-slide{
    background: #fff;
    border-radius: 1.5em;
    margin: 0 1em;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.05);
  }
}
</style>

<script>
import {Hooper, Slide} from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: 'App',
  components: {
    Hooper,
    Slide,
  },
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1.5,
      },
    };
  },
};
</script>
