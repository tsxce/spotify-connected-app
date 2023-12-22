<script>
import SideBarMenu from "./SideBarMenu.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    function navigate() {
      store.commit("setClickedIndex", 0);
      router.push({ path: "/" });
    }
    return {
      navigate,
    };
  },
  components: {
    SideBarMenu,
  },
};
</script>

<template>
  <nav class="sidebar-wrapper">
    <div class="logo-wrapper">
      <img
        src="../assets/spotify-2.svg"
        class="spotify-logo"
        alt="Spotify logo"
        @click="navigate()"
      />
    </div>
    <SideBarMenu />
  </nav>
  <nav class="sidebar-wrapper-mobile">
    <SideBarMenu />
  </nav>
</template>

<style>
.sidebar-wrapper {
  position: sticky;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: black;
}
.logo-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
.spotify-logo {
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin-bottom: 60px;
}
.sidebar-wrapper-mobile {
  display: none;
}
@media only screen and (max-width: 600px) {
  .sidebar-wrapper {
    display: none;
  }
  .sidebar-wrapper-mobile {
    display: block;
    position: fixed;
    z-index: 10;
    width: 100%;
    bottom: 0;
    background-color: black;
  }
}
</style>
