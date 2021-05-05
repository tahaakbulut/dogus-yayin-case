<template>
  <header>
    <router-link to="/add" v-if="currenPath == '/'">
      <i>+</i>SUBMIT A LINK
    </router-link>
    <router-link to="/" v-if="currenPath == '/add'">
      <i> - </i> Return to List
    </router-link>
  </header>
</template>

<script>
export default {
  data() {
    return {
      currenPath: window.location.pathname,
    };
  },
  watch: {
    $route(from) {
      this.currenPath = from.path;
    },
  },
};
</script>
