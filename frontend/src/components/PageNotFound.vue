<template>
  <div>
    <h1>Ooops... Page Not Found!</h1>
    <div class="illu">
      <img src="@/assets/error.png"
        alt="404" class="error-img">
    </div>
    <Navigation/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  components: {
    Navigation,
  },
};
</script>

<style lang="scss" scoped>
.illu{
  display: flex;
  width: 100vw;
  overflow: hidden;
  justify-content: center;
}

.error-img{
  width: 30em;
}
</style>