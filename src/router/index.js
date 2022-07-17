import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

import store from "@/store";

let router = new VueRouter({
  routes: [
    {
      name: "center",
      path: "/center",
      component: () => import("@/pages/Center"),
      meta: {
        show: true,
      },
      children: [
        {
          name: "myorder",
          path: "/center/myorder",
          component: () => import("@/pages/Center/myOrder"),
          meta: { show: true },
        },
        {
          name: "grouporder",
          path: "/center/grouporder",
          component: () => import("@/pages/Center/groupOrder"),
          meta: { show: true },
        },
        {
          path: "/center",
          redirect: "/center/myorder",
        },
      ],
    },
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: () => import("@/pages/PaySuccess"),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == "/pay") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      name: "pay",
      path: "/pay",
      component: () => import("@/pages/Pay"),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      name: "cartlist",
      path: "/cartlist",
      component: () => import("@/pages/ShopCart"),
      meta: { show: true },
    },
    {
      name: "trade",
      path: "/trade",
      component: () => import("@/pages/Trade"),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == "/cartlist") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      name: "addcartsuccess",
      path: "/addcartsuccess",
      component: () => import("@/pages/AddCartSuccess"),
      meta: { show: true },
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/pages/Home"),
      meta: {
        show: true,
      },
    },
    {
      name: "detail",
      path: "/detail/:skuid",
      component: () => import("@/pages/Detail"),
      meta: { show: true },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: () => import("@/pages/Search"),
      meta: { show: true },
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/pages/Login"),
      meta: { show: false },
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/pages/Register"),
      meta: { show: false },
    },
    {
      path: "*",
      redirect: "/home",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// })

router.beforeEach(async (to, from, next) => {
  // next()
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    if (to.path == "/login") {
      next("/login");
    } else {
      if (name) {
        next();
      } else {
        try {
          await store.dispatch("reqGetUserInfo");
          next();
        } catch (error) {
          next("/login");
        }
      }
    }
  } else {
    let toPath = to.path;
    if (
      toPath.indexOf("/center") !== -1 ||
      toPath.indexOf("/pay") !== -1 ||
      toPath.indexOf("/paysuccess") !== -1 ||
      toPath.indexOf("/trade") !== -1
    ) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});

export default router;
