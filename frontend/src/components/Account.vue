<template>
  <div class="root">
    <div class="header">
      <img src="require('@/assets/1x/')"
        alt="profile-img" class="symbol-img">
    </div>
    <div class="account-body">
      <h1 class="user-headline">It's me, Ruben!</h1>
      <ul>
        <li>
          <button>
            change profile picture
          </button>
        </li>
        <li>
          <button>
            change username
          </button>
        </li>
        <li>
          <button>
            change password
          </button>
        </li>
      </ul>
    </div>
    <NavigationAccount/>
  </div>
</template>

<script>
// import IconBase from '@/components/IconBase.vue';
import NavigationAccount from '@/components/NavigationAccount.vue';

export default {
  name: 'App',
  components: {
    NavigationAccount,
  },
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>

.header{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24vh;
  background: navy;
  color: #ffffff;

  .symbol-img{
    width: 3.5em;
    margin-top: -2em;
  }
}

.account-body{
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  color: navy;
  border-top-left-radius: 5em;
  width: 100vw;
  height: 85vh;
  margin-top: -9vh;

  .user-headline{
    margin: 2em 0 0 0;
  }

  ul{
    margin: 0;
    padding: 0;
  }
}

</style>
