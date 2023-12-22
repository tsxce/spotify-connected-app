<script>
import SideBar from "./SideBar.vue";

export default {
  components: {
    SideBar,
  },
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("Component mounted");
  },
  methods: {
    additionalMethod() {
      console.log("Additional method called");
    },
  },
};
</script>

<template>
  <main class="sidebar-template-wrapper">
    <SideBar />
    <div class="right-part">
      <component :is="component" />
    </div>
  </main>
</template>

<style>
.sidebar-template-wrapper {
  display: flex;
}
.right-part {
  display: flex;
  justify-content: center;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .sidebar-template-wrapper {
    height: 100vh;
    position: relative;
    display: block;
  }
}
</style>
