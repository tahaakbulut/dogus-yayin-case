<template>
  <div id="app">
    <Header />
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/layout/Header";
export default {
  name: "App",
  components: { Header },
  created() {
    this.$store.dispatch("initApp");
  },
};
</script>

<style>
body {
  margin: 0;
}
*,
*:before,
*:after {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 350px;
  max-width: 100%;
  min-height: 400px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 2px gray;
  padding: 20px;
  margin-top: 20px;
}
ul {
  list-style: none;
  padding-left: 0;
}
a {
  color: #333333;
  text-decoration: none;
}
hr {
  border: 1px solid #ededed;
}
button {
  cursor: pointer;
  border: none;
}
</style>
