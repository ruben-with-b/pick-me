<template>
  <div class="root">
    <ul class="bottom-navigation">
      <li class="nav-item">
        <router-link to="/">
          <icon-base width="30" height="30">
            <icon-my-bags />
          </icon-base>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/account">
          <icon-base width="30" height="30">
            <icon-account />
          </icon-base>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="" @click.native="sendForm">
          <icon-base class="logout-svg" width="50" height="50">
            <icon-save />
          </icon-base>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconMyBags from '@/assets/icons/IconMyBags.vue';
import IconAccount from '@/assets/icons/IconAccount.vue';
import IconSave from '@/assets/icons/IconSave.vue';

export default {
  name: 'App',
  components: {
    IconBase,
    IconMyBags,
    IconAccount,
    IconSave,
  },
  created() {
  },
  data() {
    return {

    };
  },
  methods: {
    sendForm() {
      this.$emit('send');
    },
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
  ul.bottom-navigation {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0 1em 0 0;
    background: linear-gradient(to bottom, rgba(0,0,115,1) 0%, rgb(0, 0, 128) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6e6e6', endColorstr='#ffffff', GradientType=0 );
    bottom: 0;
    right: 0.5em;
    position: fixed;
    height: 4em;
    width: 14em;
    border-top-left-radius: 10em;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    z-index: 30;

    &:before {
      content: "";
      display: block;
      background: #ffffff;
      position: absolute;
      top: -2.5em;
      right: -2.3em;
      width: 7em;
      height: 7em;
      border-radius: 20em;
      z-index: -1;
    }

    li:first-child {
      border-right-width: 2px;
      border-right-style: solid;
      border-image:
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          lightgrey,
        ) 1 100%;
      margin-left: 1em;
    }
    li:last-child {
      background: green;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      border-radius: 20em;
      width: 5em;
      height: 1.5em;
      transform: translate(0.2em, -0.3em);
      font-size: 3em;
      svg{
        color: #ffffff;
        transform: translate(0em, 0.1em);
      }
    }
    li{
      width: 100%;
      height: calc(4em - 1.5em);
      display: flex;
      justify-content: space-around;
      align-items: center;

      a {
        text-decoration: none;
        color: black;
        &:hover{
          color: blue;
        }
      }

      svg{
        color: #ffffff;
      }
    }
  }
</style>
