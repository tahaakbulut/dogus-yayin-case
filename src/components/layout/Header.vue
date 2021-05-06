<template>
  <header>
    <router-link to="/add" v-if="currenPath == '/'" class="submit">
      <i>+</i>SUBMIT A LINK
    </router-link>
    <template v-if="currenPath == '/add'">
      <router-link to="/" class="return">
        <i> --</i> Return to List
      </router-link>
      <h2>Add New Link</h2>
    </template>
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
<style lang="scss">
header {
  min-height: 55px;
  a {
    font-weight: 800;
    padding: 5px;

    &.submit {
      display: block;
      font-size: 21px;
      background-color: #f7f7f7;
      border: 1px solid #f0f0f0;
      border-radius: 3px;
      i {
        display: inline-block;
        height: 60px;
        width: 60px;
        line-height: 60px;
        text-align: center;
        font-style: normal;
        border-radius: 3px;
        background-color: #ececec;
        border: 1px solid #c5c5c5;
        margin-right: 15px;
      }
    }
  }

  h2 {
    font-weight: 800;
    margin: 10px 5px 5px;
  }
}
</style>
