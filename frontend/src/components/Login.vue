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
          <input type="email" id="mailField" v-model="userLoginData.mail" required class="input-area">
          <label for="mailField" class="labelMail">E-Mail</label>
        </div>
        <div class="input-group">
          <input type="password" id="passwordField" v-model="userLoginData.password" required class="input-area">
          <label for="passwordField" class="labelPassword">Password</label>
          <router-link class="signUp" to="/sign-up">
            Sign up &nbsp;›
          </router-link>
        </div>
      </form>
    </div>
    <NavigationLogin @send="submitLoginForm"/>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconLogo from '@/assets/icons/IconLogo.vue';
import NavigationLogin from '@/components/NavigationLogin.vue';

export default {
  name: 'App',
  components: {
    NavigationLogin,
    IconBase,
    IconLogo,
  },
  data() {
    return {
      userLoginData: {
        mail: '',
        password: ''
      }
    };
  },
  methods: {
    async submitLoginForm() {
      // if password input is not empty
      if (this.userLoginData.password.length > 0) {
        const url = 'http://localhost:3000/users/login';
        try{
          // post form data to server
          const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              mail: this.userLoginData.mail,
              password: this.userLoginData.password
            }),
          });
          const data = await res.json();
          // entries to local storage to keep up login
          localStorage.setItem('user',JSON.stringify(data.loggedUser));
          localStorage.setItem('jwt',data.token);
          // on successful login, go to Account
          if (localStorage.getItem('jwt') != null){
            this.$emit('loggedIn');
            this.$router.push('account');
          }
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
      &:focus + .labelMail,
      &:focus + .labelPassword{
        top: -4em;
        font-size: 0.9rem;
      }
      &:valid + .labelMail,
      &:valid + .labelPassword{
        top: -4em;
        font-size: 0.9rem;
      }
    }

    .labelMail,
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
