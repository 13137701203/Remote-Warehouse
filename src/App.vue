<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show= "this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/header";
import Footer from "./components/footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
    this.$store.dispatch("getBannerList");
  },
};
</script>

<style></style>
