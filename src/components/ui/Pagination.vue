<template>
  <div class="pagination">
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
.pagination {
  display: grid;
  justify-content: center;
  padding: 5px;
  gap: 5px;
  grid-auto-flow: column;
}
button {
  border: 1px solid transparent;
  font-size: 18px;
  padding: 3px 8px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
  &.active {
    border-color: gray;
    cursor: initial;
  }
}
</style>
