<template>
  <div class="root">
    <div class="header">
      <div class="logo-img">
        <icon-base width="30" height="30" viewBox="0 0 352 407">
          <icon-logo />
        </icon-base>
      </div>
    </div>
    <div class="sign-body">
      <h1 class="sign-headline">Login</h1>
      <form action="" method="POST">
        <div class="input-group">
          <input type="text" id="userField" required class="input-area">
          <label for="userField" class="labelUser">Username</label>
        </div>
        <div class="input-group">
          <input type="password" id="passwordField" required class="input-area">
          <label for="passwordField" class="labelPassword">Password</label>
          <router-link class="signUp" to="/sign-up">
            Sign up &nbsp;›
          </router-link>
        </div>
      </form>
    </div>
    <NavigationCheck/>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconLogo from '@/assets/icons/IconLogo.vue';
import NavigationCheck from '@/components/NavigationCheck.vue';

export default {
  name: 'App',
  components: {
    NavigationCheck,
    IconBase,
    IconLogo,
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

  .logo-img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5em;
    height: 3.5em;
    margin-top: -2em;
    background: #ffffff;
    border-radius: 3em;
    color: navy;
  }
}

.sign-body{
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  color: navy;
  border-top-left-radius: 5em;
  width: 100vw;
  height: 85vh;
  margin-top: -9vh;

  .sign-headline{
    margin: 2em 0 2em 0;
  }

  .input-group{
    display: flex;
    flex-direction: column;
    margin: 0 0 1em 0;
    width: 18em;

    .input-area{
      outline: none;
      padding: 0.5em 0;
      border: none;
      border-bottom: 2px solid #eeeeee;
      font-size: 1.1rem;
      &:focus{
        border-bottom: 2px solid royalblue;
      }
      &:focus + .labelUser,
      &:focus + .labelPassword{
        top: -4em;
        font-size: 0.9rem;
      }
      &:valid + .labelUser,
      &:valid + .labelPassword{
        top: -4em;
        font-size: 0.9rem;
      }
    }

    .labelUser,
    .labelPassword{
      position: relative;
      top: -2em;
      font-size: 1.1rem;
      transition: 100ms all ease-in-out;
    }
  }

  .signUp{
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    margin: 2em 0 0 0;
  }
}
</style>
