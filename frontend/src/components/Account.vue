<template>
  <div class="root">
    <div class="header">
      <img src="require('@/assets/1x/')"
        alt="profile-img" class="profile-img">
    </div>
    <div class="account-body">
      <h1 class="user-headline">It's me, Ruben!</h1>
      <ul class="buttongroup">
        <li>
          <button class="account-button">
            upload new profile picture
          </button>
        </li>
        <li>
          <button class="account-button">
            change username
          </button>
        </li>
        <li>
          <button class="account-button">
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

  .profile-img{
    width: 3.5em;
    margin-top: -2em;
    background: #ffffff;
    border-radius: 3em;
    color: navy;
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

  .buttongroup{
    margin: 4em 0 0 0;
    padding: 0;

    li{
      border-bottom: 2px solid #eeeeee;
    }

    li:last-child{
      border: none;
    }

    .account-button{
      outline: none;
      cursor: pointer;
      color: navy;
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0 0;
      padding: 0.7em;
      width: 100%;
      text-align: left;
    }
  }
}

</style>
