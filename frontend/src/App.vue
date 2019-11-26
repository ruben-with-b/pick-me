<template>
  <div>
    <ul class="bottom-navigation">
      <li class="nav-item" v-for="(link, index) in links" :key="index">
        <router-link :to="link.to">{{ link.name }}</router-link>
      </li>
    </ul>
    <main>
      <router-view/>
    </main>
  </div>
</template>

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
    }
  }
</style>

<script>
export default {
  data: () => ({
    links: [
      {
        name: 'My bags',
        to: '/',
      },
      {
        name: 'Overview',
        to: '/overview',
      },
      {
        name: '+',
        to: '/list',
      },
    ],
  }),
};
</script>
