<template>
  <div>
    <button
      v-for="n in parseInt(getSites.length / 5) + 1"
      :key="n"
      :class="getCurrentPage == n && 'active'"
      @click="changePage(n)"
    >
      {{ n }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    getSites: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters(["getCurrentPage"]),
  },
  methods: {
    ...mapMutations(["updateCurrentPage"]),
    changePage(n) {
      this.updateCurrentPage(n);
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border: none;
  font-size: 18px;
  background-color: transparent;
  &.active {
    border: 1px solid gray;
  }
}
</style>
