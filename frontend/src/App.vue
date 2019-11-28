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
    background: linear-gradient(to bottom, rgba(230,230,230,1) 0%, rgba(255,255,255,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e6e6e6', endColorstr='#ffffff', GradientType=0 );
    bottom: 0;
    right: 0.5em;
    position: fixed;
    height: 4em;
    width: 14em;
    border-top-left-radius: 10em;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    &:before {
      content: "";
      display: block;
      background: salmon;
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
      background: navy;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      border-radius: 20em;
      width: 5em;
      height: 1.5em;
      transform: translate(0.2em, -0.3em);
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
