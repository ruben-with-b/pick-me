<template>
  <div>
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
        <router-link to="/overview">
          <icon-base width="50" height="50">
              <icon-add />
          </icon-base>
        </router-link>
      </li>
    </ul>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import IconBase from '@/components/IconBase.vue';
import IconMyBags from '@/assets/icons/IconMyBags.vue';
import IconAccount from '@/assets/icons/IconAccount.vue';
import IconAdd from '@/assets/icons/IconAdd.vue';

export default {
  components: {
    IconBase,
    IconMyBags,
    IconAccount,
    IconAdd,
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
    background: #FFF;
    bottom: 0;
    right: 0;
    position: fixed;
    height: 4em;
    width: 18em;
    border-top-left-radius: 10em;

    &:before {
      content: "";
      display: block;
      background: salmon;
      position: absolute;
      top: -3em;
      right: -3em;
      width: 8em;
      height: 8em;
      border-radius: 20em;
      z-index: -1;
    }

    li:first-child {
      border-right: 2px solid lightgrey;
      margin-left: 1em;
    }
    li:last-child {
      background: navy;
      border-radius: 20em;
      width: 7em;
      height: 2em;
      transform: translate(0.7em,-0.4em);
      font-size: 3em;
      svg{
        color: #fff;
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
        color: navy;
      }
    }
  }
</style>
