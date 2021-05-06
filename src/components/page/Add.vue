<template>
  <form class="car-body" @submit.prevent="updateSite">
    <div>
      <label for="siteName">Link Name</label>
      <input v-model="site.title" id="siteName" required />
    </div>
    <div>
      <label for="siteLink">Link Url</label>
      <input type="url" v-model="site.link" id="siteLink" required />
    </div>
    <button>Add</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      site: {
        title: "",
        link: "",
      },
    };
  },
  methods: {
    ...mapActions(["addSite"]),
    updateSite() {
      console.log(this.site, "site");
      this.addSite(this.site);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
$elemetHeight: 38px;
form {
  display: grid;
  gap: 10px;
}
input {
  border-radius: 4px;
  height: $elemetHeight;
  border: 1px solid #d3d3d3;
  width: 100%;
}
label {
  padding-left: 5px;
  padding-right: 5px;
}
button {
  margin-left: auto;
  background-color: #000;
  border: none;
  color: white;
  border-radius: 25px;
  height: $elemetHeight;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 18px;
  font-weight: 800;
  &:hover,
  &:focus {
    background-color: rgba($color: #000000, $alpha: 0.9);
  }
}
</style>
