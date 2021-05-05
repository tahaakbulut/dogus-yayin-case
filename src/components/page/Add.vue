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

<style></style>
