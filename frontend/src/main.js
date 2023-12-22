import "./assets/main.css";

import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";
import VueCookies from "vue-cookies";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      clickedIndex: 0,
    };
  },
  mutations: {
    setClickedIndex(state, payload) {
      state.clickedIndex = payload;
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(VueCookies);
app.use(store);

app.mount("#app");
