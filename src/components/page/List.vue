<template>
  <div>
    <Dropdown v-model="dropdownShow" :right="true">
      <button>Order By</button>
      <template slot="dropdown">
        <button @click="sortList(true)">Most Voted (Z -> A)</button>
        <button @click="sortList(false)">Less Voted (A -> Z)</button>
      </template>
    </Dropdown>
    <ul>
      <template v-for="(site, i) in getSites">
        <li v-if="site.page == getCurrentPage" :key="i">
          {{ site.vote }}
          {{ site.title }}
          <small>({{ site.link }})</small>
          <div>
            <button
              @click="changeVote(site.id, site.vote - 1)"
              :disabled="site.vote <= minVote"
            >
              Down
            </button>
            <button
              @click="changeVote(site.id, site.vote + 1)"
              :disabled="site.vote >= maxVote"
            >
              Up
            </button>
            <button @click="handleClick(site.id, site.title)">
              DELETE
            </button>
          </div>
        </li>
      </template>
    </ul>
    <Pagination :getSites="getSites" />
    <vue-confirm-dialog class="dialog"></vue-confirm-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Dropdown from "../ui/Dropdown";
import Pagination from "../ui/Pagination";

export default {
  data() {
    return {
      maxVote: 10,
      minVote: 0,
      dropdownShow: false,
    };
  },
  components: {
    Dropdown,
    Pagination,
  },
  computed: {
    ...mapGetters(["getSites", "getCurrentPage"]),
  },
  methods: {
    ...mapMutations(["sortLinks"]),
    ...mapActions(["updateVote", "removeSite"]),
    changeVote(id, vote) {
      this.updateVote({ id, vote });
    },
    sortList(payload) {
      this.sortLinks(payload);
    },
    handleClick(id, title) {
      this.$confirm({
        title: `Do you want to remove:`,
        message: title,
        button: {
          no: "CANCEL",
          yes: "OK",
        },
        callback: (confirm) => {
          if (confirm) {
            console.log(title + " removed");
            this.removeSite(id);
          }
        },
      });
    },
  },
};
</script>
<style lang="scss">
.dialog {
  .vc-title {
    font-weight: 400;
  }
  .vc-text {
    font-weight: 800;
    font-size: 20px;
  }
}
</style>
