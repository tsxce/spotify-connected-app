import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import TopArtistsView from "../views/TopArtistsView.vue";
import TopTracksView from "../views/TopTracksView.vue";
import RecentListView from "../views/RecentListView.vue";
import PlayListsView from "../views/PlayListsView.vue";
import WithSideBar from "../components/WithSideBar.vue";
import TrackDetailView from "../views/TrackDetailView.vue";
import ArtistDetailView from "../views/ArtistDetailView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/",
      alias: "/profile",
      name: "Profile",
      component: WithSideBar,
      props: {
        component: ProfileView,
      },
      beforeEnter: (to, from) => {
        const isAuthenticated = localStorage.getItem("token_spotify");
        if (
          !isAuthenticated
          // &&
          // ❗️ 避免无限重定向
          // to.name !== 'Login'
        ) {
          // 将用户重定向到登录页面
          return { name: "Login" };
        }
      },
    },
    {
      path: "/topartists",
      name: "TopArtists",
      component: WithSideBar,
      props: {
        component: TopArtistsView,
      },
      beforeEnter: (to, from) => {
        const isAuthenticated = localStorage.getItem("token_spotify");
        if (
          !isAuthenticated
          // &&
          // ❗️ 避免无限重定向
          // to.name !== 'Login'
        ) {
          // 将用户重定向到登录页面
          return { name: "Login" };
        }
      },
    },
    {
      path: "/toptracks",
      name: "TopTracks",
      component: WithSideBar,
      props: {
        component: TopTracksView,
      },
      beforeEnter: (to, from) => {
        const isAuthenticated = localStorage.getItem("token_spotify");
        if (
          !isAuthenticated
          // &&
          // ❗️ 避免无限重定向
          // to.name !== 'Login'
        ) {
          // 将用户重定向到登录页面
          return { name: "Login" };
        }
      },
    },
    {
      path: "/recentlist",
      name: "RecentList",
      component: WithSideBar,
      props: {
        component: RecentListView,
      },
      beforeEnter: (to, from) => {
        const isAuthenticated = localStorage.getItem("token_spotify");
        if (
          !isAuthenticated
          // &&
          // ❗️ 避免无限重定向
          // to.name !== 'Login'
        ) {
          // 将用户重定向到登录页面
          return { name: "Login" };
        }
      },
    },
    {
      path: "/playlists",
      name: "PlayLists",
      component: WithSideBar,
      props: {
        component: PlayListsView,
      },
      beforeEnter: (to, from) => {
        const isAuthenticated = localStorage.getItem("token_spotify");
        if (
          !isAuthenticated
          // &&
          // ❗️ 避免无限重定向
          // to.name !== 'Login'
        ) {
          // 将用户重定向到登录页面
          return { name: "PlayLists" };
        }
      },
    },
    {
      path: "/track/:trackId",
      component: WithSideBar,
      props: {
        component: TrackDetailView,
      },
      beforeEnter: (to, from) => {
        const isAuthenticated = localStorage.getItem("token_spotify");
        if (
          !isAuthenticated
          // &&
          // ❗️ 避免无限重定向
          // to.name !== 'Login'
        ) {
          // 将用户重定向到登录页面
          return { name: "PlayLists" };
        }
      },
    },
    {
      path: "/artist/:artist",
      component: WithSideBar,
      props: {
        component: ArtistDetailView,
      },
      beforeEnter: (to, from) => {
        const isAuthenticated = localStorage.getItem("token_spotify");
        if (!isAuthenticated) {
          return { name: "PlayLists" };
        }
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
