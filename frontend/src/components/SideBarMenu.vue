<script>
import { useRouter } from "vue-router";

import { useStore } from "vuex";

import SideBarMenuItem from "./SideBarMenuItem.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    function navigate(path, index) {
      store.commit("setClickedIndex", index);
      router.push({ path: path });
    }

    return {
      navigate,
    };
  },
  data() {
    return {
      tags: [
        { id: 1, name: "Profile", path: "/" },
        { id: 2, name: "Top Artists", path: "/topartists" },
        { id: 3, name: "Top Tracks", path: "/toptracks" },
        { id: 4, name: "Recent", path: "/recentlist" },
        { id: 5, name: "Playlists", path: "/playlists" },
      ],
    };
  },
  methods: {
    handleLogOut() {
      console.log("logout!");
      // 清除cookie
      document.cookie =
        "token_spotify=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      // 清除localStorage
      localStorage.removeItem("token_spotify");
      this.$router.push("/login");
    },
  },
  components: {
    SideBarMenuItem,
  },
};
</script>

<template>
  <ul class="sidebar-menu-wrapper">
    <li v-for="(tag, index) in tags">
      <SideBarMenuItem
        :key="tag.id"
        :itemName="tag.name"
        :isClicked="index === $store.state.clickedIndex"
        @click="navigate(tag.path, index)"
      />
    </li>
  </ul>

  <div class="logout-button" @click="handleLogOut">Logout</div>

  <router-view></router-view>
</template>

<style>
.sidebar-menu-wrapper {
  color: white;
  list-style: none;
  padding-left: 0;
  text-align: center;
}
.logout-button {
  position: absolute;
  bottom: 20px;
  width: 100%;
  cursor: pointer;
  text-align: center;
  font-size: 13px;
  color: var(--color-grey-text);
}
@media only screen and (max-width: 600px) {
  .sidebar-menu-wrapper {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  .logout-button {
    display: none;
  }
}
</style>
