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
          <div class="point">
            <b>{{ site.vote }}</b>
            <span>POINTS</span>
          </div>
          <div>
            <h3>{{ site.title }}</h3>
            <small>({{ site.link }})</small>
            <div class="vote">
              <button
                @click="changeVote(site.id, site.vote + 1)"
                :disabled="site.vote >= maxVote"
              >
                Up Vote
              </button>
              <button
                @click="changeVote(site.id, site.vote - 1)"
                :disabled="site.vote <= minVote"
              >
                Down Vote
              </button>
            </div>
            <button @click="handleClick(site.id, site.title)" class="delete">
              -
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
ul {
  min-height: 400px;
  li {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 3px;
    border: 1px solid transparent;
    padding: 5px;
    h3 {
      line-height: 1;
      margin: 0;
      font-weight: 800;
    }
    small {
      display: block;
      margin-bottom: 5px;
    }
    .point {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60px;
      width: 60px;
      font-style: normal;
      border-radius: 3px;
      background-color: #ececec;
      border: 1px solid #c5c5c5;
      margin-right: 15px;
      b {
        font-size: 18px;
        line-height: 1;
      }
      span {
        font-size: 12px;
      }
    }
    .delete {
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      border-radius: 50%;
      width: 25px;
      height: 25px;
      line-height: 1;
      font-weight: 800;
      font-size: 20px;
      box-shadow: 0 0 5px black;
      background-color: #f10;
      color: white;
      border: 1px solid white;
    }
    .vote {
      display: flex;
      justify-content: space-between;
      button {
        background-color: transparent;
        color: gray;
        padding: 0;
      }
    }
    &:hover {
      background-color: #f7f7f7;
      border-color: #f0f0f0;
      .delete {
        display: block;
      }
    }
  }
}
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
