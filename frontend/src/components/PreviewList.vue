<template>
  <div class="root">
    <ul>
      <li v-for="(list, indx) in prevList" :key="indx" :index="indx">
        <span v-if="prevList[indx].state === true">
          <icon-base width="20" height="20" viewBox="0 0 8 8">
            <icon-save />
          </icon-base>
        </span>
        <span v-if="prevList[indx].state === false">
          <icon-base width="20" height="20" viewBox="0 0 8 8">
            <icon-close />
          </icon-base>
        </span>
        {{ prevList[indx].name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>

ul{
  list-style: none;
  margin: 0;
  padding: 0;

  svg{
    margin-left: -0.4rem;
  }
}

</style>

<script>
import IconBase from '@/components/IconBase.vue';
import IconClose from '@/assets/icons/IconClose.vue';
import IconSave from '@/assets/icons/IconSave.vue';

export default {
  name: 'App',
  props: {
    prop: Object,
  },
  components: {
    IconSave,
    IconBase,
    IconClose,

  },
  data() {
    return {
      prevList: this.prop.content,
      item: this.item,
    };
  },
  mounted() {
  },
};
</script>
