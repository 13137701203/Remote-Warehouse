import Vue from "vue";
import App from "./App.vue";
import TypeNav from "@/components/TypeNav";
import carousel from "@/components/carousel";
import pagination from "@/components/Pagination";

Vue.component(TypeNav.name, TypeNav);
Vue.component("carousel", carousel);
Vue.component(pagination.name, pagination);

Vue.config.productionTip = false;
import router from "@/router";
import "@/mock/mockServe";
import "swiper/css/swiper.css";
import store from "@/store";
import * as API from "@/api";
import { MessageBox } from "element-ui";
import Vuelazyload from "vue-lazyload";
import lazyload from "@/assets/images/lazyload.gif";

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.use(Vuelazyload, {
  loading: lazyload,
});

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount("#app");
